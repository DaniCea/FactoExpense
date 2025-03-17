import { useEffect, useState } from "react";
import { getExpenses } from "../api/expenses";
import {AuthForm, ExpenseCard, NavBar, NewExpenseForm} from "../components";
import * as React from "react";

function NewExpensePage() {
  return (
    <>
      <NavBar/>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <NewExpenseForm />
        </div>
      </section>
    </>
  );
}


export default NewExpensePage;