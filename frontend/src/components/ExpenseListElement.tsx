import Plane from "../icons/plane";
import Hotel from "../icons/hotel";
import { Selector } from "./common";
import { useState } from "react";

interface IExpenseListProps {
  expense: any;
  shouldEditStatus?: boolean;
  onChange: (expenseId: string, status: string) => void;
}

export default function ExpenseListElement({ expense, shouldEditStatus = false, onChange }: IExpenseListProps) {
  const [status, setStatus] = useState(expense.status);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    onChange(expense.id, e.target.value);
  }

  const generateStatusIcon = () => {
    if (expense.status === 'pending') {
      return '⏳'
    } else if (expense.status === 'accepted') {
      return '✅'
    } else if (expense.status === 'rejected') {
      return '❌'
    } else {
      return '❓'
    }
  }

  return (
    <li className="pb-3 pt-3" key={expense.id}>
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="shrink-0">
          <Plane />
        </div>
        <div className="flex-auto">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            { expense.title }
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            { expense.description }
          </p>
        </div>
        <div className="flex justify-end">
          <div className="mr-3 font-semibold text-gray-900 dark:text-white">
            { expense.amount } $
          </div>
          { shouldEditStatus && (
            <div className="mr-3 font-semibold text-gray-900 dark:text-white">
              <Selector
                value={status}
                onChange={handleStatusChange}
                id="expense_type"
                options={["pending", "accepted", "rejected"]}
                displayOptions={["⏳ Pending", "✅ Accepted", "❌ Rejected"]}
              />
            </div>
          )}
          { !shouldEditStatus && (
            <div className="font-semibold text-gray-900 dark:text-white">
              { generateStatusIcon() }{ expense.status[0].toUpperCase() + expense.status.slice(1) }
            </div>
          )}
        </div>
      </div>
    </li>
  );
}