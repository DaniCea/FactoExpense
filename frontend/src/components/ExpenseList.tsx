import ExpenseListElement from "./ExpenseListElement";

interface IExpenseListProps {
  expenses: any[]; // TODO
}

export default function ExpenseList({ expenses }: IExpenseListProps) {
  return (
    <ul className="max-w divide-y divide-gray-200 dark:divide-gray-700">
      {expenses.map((expense) => (
        <ExpenseListElement key={expense.id} expense={expense}/>
      ))}
    </ul>
  );
}