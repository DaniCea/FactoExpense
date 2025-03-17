import { useEffect, useState } from "react";
import { getExpenses } from "../api/expenses";
import { ExpenseCard, NavBar } from "../components";
import * as React from "react";
import { useNavigate } from "react-router";

function HomePage() {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() =>{
    getExpenses().then((response) => {
      setExpenses(response.data);
      console.log(response);
    }).catch((error) => {
      console.error('Error fetching data: ', error);
    });
  }, [])

  return (
    <>
      <NavBar />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="mb-5">
            <button type="submit"
                    onClick={() => navigate('/new-expense')}
                    className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
              Create new expense
            </button>
          </div>
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