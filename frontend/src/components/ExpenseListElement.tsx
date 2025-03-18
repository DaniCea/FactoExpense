import Plane from "../icons/plane";

interface IExpenseListProps {
  expense: any;
}

export default function ExpenseListElement({ expense }: IExpenseListProps) {
  return (
    <li className="pb-3 pt-3" key={expense.id}>
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="shrink-0">
          <Plane />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            { expense.title }
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            { expense.description }
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          { expense.amount }$
        </div>
      </div>
    </li>
  );
}