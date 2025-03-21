import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import { format } from 'date-fns';
import { UTCDate } from '@date-fns/utc';

import { getExpenses } from "../api";
import { useNavigate } from "react-router";
import { Button, Input, Selector } from "../components/common";
import { ExpenseList } from "../components";
import { ExpenseStatus } from "../common";
import { Expense } from "../models/Expense";
import { GreyBackgroundLayout } from "./layouts";

function HomePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [filters, setFilters] = useState({
    status: null,
    from: null,
    to: null,
  });
  const navigate = useNavigate();
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const maxDate = useMemo(() => {
    return format(new UTCDate(), 'yyyy-MM-dd');
  }, []);

  useEffect(() =>{
    getExpenses(filters).then((expenses) => {
      setExpenses(expenses);
      console.log(expenses);
    }).catch((error) => {
      console.error('Error fetching data: ', error);
    });
  }, [filters])

  return (
    <GreyBackgroundLayout withNavbar>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <Selector
            label="Status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            id="status"
            placeholder="Filter by status"
            options={[ "", ExpenseStatus.PENDING, ExpenseStatus.ACCEPTED, ExpenseStatus.REJECTED ]}
            displayOptions={["All", "Pending ⏳", "Accepted ✅", "Rejected ❌"]}
          />
        </div>
        <div>
          <Input type="date" max={maxDate} label='From' name='from' id='from' placeholder="From Date" value={filters.from} onChange={handleFilterChange} />
        </div>
        <div>
          <Input type="date" max={maxDate} label='To' name='to' id='to' placeholder="To Date" value={filters.to} onChange={handleFilterChange} />
        </div>
        <div className="flex items-end">
          <Button onClick={() => navigate('/new-expense')} text="Create new expense" />
        </div>
      </div>
      <div className="w-full max-h-[75vh] overflow-y-auto mt-5">
        <ExpenseList expenses={ expenses }></ExpenseList>
      </div>
    </GreyBackgroundLayout>
  );
}

export default HomePage;