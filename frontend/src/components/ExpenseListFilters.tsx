import * as React from "react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import { UTCDate } from "@date-fns/utc";

import {Button, Input, Selector} from "./common";
import { ExpenseStatus } from "../common";

export interface IExpenseListFilters {
  status?: ExpenseStatus,
  from?: string,
  to?: string
}

interface IExpenseListProps {
  onChange: (filters: IExpenseListFilters) => void;
}

export default function ExpenseListFilters({ onChange }: IExpenseListProps) {
  const [filters, setFilters] = useState<IExpenseListFilters>({});
  const navigate = useNavigate();
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newFilters: IExpenseListFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters(newFilters);
    onChange(newFilters);
  };

  const maxDate = useMemo(() => {
    return format(new UTCDate(), 'yyyy-MM-dd');
  }, []);

  return (
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
  );
}