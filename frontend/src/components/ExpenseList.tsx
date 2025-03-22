import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import ExpenseListElement, { IExpenseListStatusProps } from "./ExpenseListElement";
import { updateExpenseStatus } from "../api";
import { Expense } from "../models/Expense";
import { User } from "../models/User";
import { UserType } from "../common";

interface IExpenseListProps {
  expenses: Expense[];
}

export default function ExpenseList({ expenses }: IExpenseListProps) {
  const user = useAuthUser<User>();

  const handleChange = ({ expense, newStatus }: IExpenseListStatusProps) => {
    updateExpenseStatus({ expenseId: expense.id, status: newStatus }).catch((error) => {
      console.error('Error updating status: ', error);
    });
  };

  return (
    <ul className="max-w divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto">
      {expenses.map((expense) => (
        <ExpenseListElement key={expense.id} expense={expense} shouldEditStatus={user.role === UserType.ADMIN} onChange={handleChange}/>
      ))}
    </ul>
  );
}