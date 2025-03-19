import ExpenseListElement from "./ExpenseListElement";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { updateExpenseStatus } from "../api/expenses";

interface IExpenseListProps {
  expenses: any[]; // TODO
}

export default function ExpenseList({ expenses }: IExpenseListProps) {
  const userAuth = useAuthUser();

  console.log(userAuth);
  console.log(userAuth.user.role === "admin");

  const handleChange = (expenseId: string, status: string) => {
    console.log(status);
    updateExpenseStatus({expenseId, status}).then((response) => {
      debugger;
      console.log(response)
    }).catch((error) => {
      console.error('Error updating status: ', error);
    });
  };

  console.log(expenses);

  return (
    <ul className="max-w divide-y divide-gray-200 dark:divide-gray-700">
      {expenses.map((expense) => (
        <ExpenseListElement key={expense.id} expense={expense} shouldEditStatus={userAuth.user.role === "admin"} onChange={handleChange}/>
      ))}
    </ul>
  );
}