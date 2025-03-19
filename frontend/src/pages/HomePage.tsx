import { useEffect, useState } from "react";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { getExpenses } from "../api/expenses";
import { NavBar } from "../components";
import * as React from "react";
import { useNavigate } from "react-router";
import {Button, Input, Selector} from "../components/common";
import ExpenseList from "../components/ExpenseList";

function HomePage() {
  const authUser = useAuthUser()
  const [expenses, setExpenses] = useState([]);

  console.log(authUser);

  const [filters, setFilters] = useState({
    status: null,
    from: null,
    to: null,
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  useEffect(() =>{
    getExpenses(filters).then((response) => {
      setExpenses(response.data);
      console.log(response);
    }).catch((error) => {
      console.error('Error fetching data: ', error);
    });
  }, [filters])

  return (
    <>
      <NavBar />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="px-6 py-8 mx-auto h-screen mb-5">
          <div className="grid grid-cols-4 gap-4">
            <div className="">
              <Selector
                label="Status"
                name="status"
                value={filters.status}
                onChange={handleChange}
                id="status"
                placeholder="Filter by status"
                options={["pending", "accepted", "rejected"]}
              />
            </div>
            <div className="">
              <Input type="date" max={new Date().toISOString().split('T')[0]} label='From' name='from' id='from' placeholder="From Date" value={filters.from} onChange={handleChange} />
            </div>
            <div className="">
              <Input type="date" max={new Date().toISOString().split('T')[0]} label='To' name='to' id='to' placeholder="To Date" value={filters.to} onChange={handleChange} />
            </div>
            <div className="">
              <Button onClick={() => navigate('/new-expense')} text="Create new expense" />
            </div>
          </div>
          <div className="w-full">
            <ExpenseList expenses={expenses}></ExpenseList>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;