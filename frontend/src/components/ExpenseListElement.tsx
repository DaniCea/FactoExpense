import * as React from "react";
import { useMemo, useState } from "react";
import { format } from "date-fns";
import { UTCDate } from "@date-fns/utc";
import { PlaneIcon, GasIcon, HotelIcon, ExpenseIcon } from "../icons";
import { Selector } from "./common";
import { ExpenseStatus } from "../common/enums";

interface IExpenseListProps {
  expense: any;
  shouldEditStatus?: boolean;
  onChange: (expenseId: string, status: string) => void;
}

export default function ExpenseListElement({ expense, shouldEditStatus = false, onChange }: IExpenseListProps) {
  const [status, setStatus] = useState(expense.status);

  console.log(expense);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    onChange(expense.id, e.target.value);
  }

  const createdAt = useMemo(() => {
    return format(new UTCDate(expense.created_at), 'MM/dd/yyyy');
  }, []);

  const iconSelector= () => {
    if (expense.expenseable_type === "TravelExpense" && expense.expenseable.travel_expense.travel_expenseable_type === "TransportationTravelExpense") return <PlaneIcon />
    if (expense.expenseable_type === "TravelExpense" && expense.expenseable.travel_expense.travel_expenseable_type === "AccommodationTravelExpense") return <HotelIcon />
    if (expense.expenseable_type === "MileageExpense") return <GasIcon />
    else return <ExpenseIcon />
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
          { iconSelector() }
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