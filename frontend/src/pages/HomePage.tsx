import { useEffect, useState } from "react";
import { getExpenses } from "../api/expenses";
import { NavBar } from "../components";
import * as React from "react";
import { useNavigate } from "react-router";
import {Button, Input, Selector} from "../components/common";
import ExpenseList from "../components/ExpenseList";

function HomePage() {
  const [expenses, setExpenses] = useState([]);

  const [filters, setFilters] = useState({
    status: null,
    from: null,
    to: null,
  });
  const navigate = useNavigate();
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  useEffect(() =>{
    getExpenses(filters).then((response) => {
      setExpenses(response.data);
    }).catch((error) => {
      console.error('Error fetching data: ', error);
    });
  }, [filters])

  return (
    <div className="h-screen bg-gray-50">
      <NavBar />
      <section className="dark:bg-gray-900">
        <div className="px-6 py-8 mx-auto">
          <div className="grid grid-cols-4 gap-4">
            <div className="">
              <Selector
                label="Status"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                id="status"
                placeholder="Filter by status"
                options={["", "pending", "accepted", "rejected"]}
                displayOptions={["All", "Pending ⏳", "Accepted ✅", "Rejected ❌"]}
              />
            </div>
            <div className="">
              <Input type="date" max={new Date().toISOString().split('T')[0]} label='From' name='from' id='from' placeholder="From Date" value={filters.from} onChange={handleFilterChange} />
            </div>
            <div className="">
              <Input type="date" max={new Date().toISOString().split('T')[0]} label='To' name='to' id='to' placeholder="To Date" value={filters.to} onChange={handleFilterChange} />
            </div>
            <div className="flex items-end">
              <Button onClick={() => navigate('/new-expense')} text="Create new expense" />
            </div>
          </div>
          <div className="w-full max-h-[75vh] overflow-y-auto mt-5">
            <ExpenseList expenses={expenses}></ExpenseList>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;