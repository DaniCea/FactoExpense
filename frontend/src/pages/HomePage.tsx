import * as React from "react";
import { useEffect, useState } from "react";

import { getExpenses } from "../api";
import { ExpenseList, ExpenseListFilters } from "../components";
import { Expense } from "../models/Expense";
import { GreyBackgroundLayout } from "./layouts";
import { IExpenseListFilters } from "../components/ExpenseList/ExpenseListFilters";

function HomePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filters, setFilters] = useState<IExpenseListFilters>({})

  const handleFilterChange = (filters: IExpenseListFilters) => {
    setFilters(filters);
  }

  useEffect(() =>{
    getExpenses(filters).then((expenses) => {
      setExpenses(expenses);
    }).catch((error) => {
      console.error('Error fetching data: ', error);
    });
  }, [filters])

  return (
    <GreyBackgroundLayout withNavbar>
      <ExpenseListFilters onChange={handleFilterChange}/>
      <div className="w-full max-h-[75vh] overflow-y-auto mt-5">
        <ExpenseList expenses={ expenses }></ExpenseList>
      </div>
    </GreyBackgroundLayout>
  );
}

export default HomePage;