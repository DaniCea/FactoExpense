import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import ExpenseListElement from "./ExpenseListElement";
import { updateExpenseStatus } from "../api";
import { Expense } from "../models/Expense";

interface IExpenseListProps {
  expenses: Expense[];
}

export default function ExpenseList({ expenses }: IExpenseListProps) {
  const userAuth = useAuthUser();

  const handleChange = (expenseId: number, status: string) => {
    updateExpenseStatus({ expenseId, status }).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.error('Error updating status: ', error);
    });
  };

  return (
    <ul className="max-w divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto">
      {expenses.map((expense) => (
        <ExpenseListElement key={expense.id} expense={expense} shouldEditStatus={userAuth.user.role === "admin"} onChange={handleChange}/>
      ))}
    </ul>
  );
}