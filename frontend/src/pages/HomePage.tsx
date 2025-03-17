import { useEffect, useState } from "react";
import { getExpenses } from "../api/expenses";
import {ExpenseCard, NavBar} from "../components";

function HomePage() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() =>{
    getExpenses().then((response) => {
      setExpenses(response.data);
      console.log(response);
    }).catch((error) => {
      console.error('Error fetching data: ', error);
    });
  })

  return (
    <>
      <NavBar />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex flex-wrap w-full">
            {expenses.map((expense) => (
              <ExpenseCard key={expense.id} type={expense.expense_type} status={expense.status} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;