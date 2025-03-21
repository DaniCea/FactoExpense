import * as React from "react";
import { useMemo, useState } from "react";
import { format } from "date-fns";
import { UTCDate } from "@date-fns/utc";
import { PlaneIcon, GasIcon, HotelIcon, ExpenseIcon } from "../icons";
import { ExpenseType, TravelExpenseType } from "../common/enums";
import { Selector } from "./common";
import { ExpenseStatus } from "../common/enums";
import { Expense } from "../models/Expense";

interface IExpenseListProps {
  expense: Expense;
  shouldEditStatus?: boolean;
  onChange: (expenseId: number, status: ExpenseStatus) => void;
}

export default function ExpenseListElement({ expense, shouldEditStatus = false, onChange }: IExpenseListProps) {
  const [status, setStatus] = useState(expense.status);

  console.log(expense);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as ExpenseStatus);
    onChange(expense.id, e.target.value as ExpenseStatus);
  }

  const createdAt = useMemo(() => {
    return format(new UTCDate(expense.created), 'MM/dd/yyyy');
  }, [expense.created]);

  const iconSelector = useMemo(() => {
    const iconMap = {
      [TravelExpenseType.TRANSPORTATION]: <PlaneIcon />,
      [TravelExpenseType.ACCOMMODATION]: <HotelIcon />,
      [ExpenseType.MILEAGE]: <GasIcon />,
      default: <ExpenseIcon />
    };

    if (expense.expenseType === ExpenseType.TRAVEL) {
      const travelType = expense.travel.transportation
        ? TravelExpenseType.TRANSPORTATION
        : expense.travel.accommodation
          ? TravelExpenseType.ACCOMMODATION
          : null;

      return iconMap[travelType] || iconMap.default;
    }

    return iconMap[expense.expenseType] || iconMap.default;
  }, [expense]);

  const extraInfoRenderer = () => {
    if (expense.travel?.transportation) {
      return `${expense.travel.transportation.transportationMode} -- ${expense.travel.transportation.route}`;
    }
    if (expense.travel?.accommodation) {
      const accommodation = expense.travel.accommodation;
      return `${accommodation.hotelName} -- From ${format(new Date(accommodation.checkinDate), 'MM/dd/yyyy')} to ${format(new Date(accommodation.checkoutDate), 'MM/dd/yyyy')}`; // TODO: Fix dates
    }
    if (expense.mileage) {
      return `${expense.mileage.mileageKm} KM`;
    }
  }

  const generateStatusIcon = () => {
    switch (expense.status) {
      case ExpenseStatus.PENDING:
        return '⏳';
      case ExpenseStatus.ACCEPTED:
        return '✅';
      case ExpenseStatus.REJECTED:
        return '❌';
      default:
        return '❓';
    }
  }

  return (
    <li className="pb-3 pt-3" key={expense.id}>
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="shrink-0">
          { iconSelector }
        </div>
        <div className="flex-auto">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            { expense.title }
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            { expense.description }
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            { createdAt }
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            { extraInfoRenderer() }
          </p>
        </div>
        <div className="flex justify-end">
          <div className="mr-3 min-w-[100px] text-center text-gray-900 dark:text-white">
            <div className="text-xl font-semibold">{ expense.amount } $</div>
            { shouldEditStatus && (
              <div className="mb-3 min-w-[100px] text-center ">
                <Selector
                  value={status}
                  onChange={handleStatusChange}
                  id="expense_type"
                  options={Object.values(ExpenseStatus)}
                  displayOptions={["Pending ⏳", "Accepted ✅", "Rejected ❌"]}
                />
              </div>
            )}
            { !shouldEditStatus && (
              <div className="min-w-[100px] ">
                { expense.status[0].toUpperCase() + expense.status.slice(1) } { generateStatusIcon() }
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}