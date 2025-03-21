import * as React from "react";
import { useMemo, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import { UTCDate } from "@date-fns/utc";

import { Button, Input, Selector } from "./common";
import { ExpenseStatus } from "../common";
import { ROUTES } from "../router/routes";

export interface IExpenseListFilters {
  status?: ExpenseStatus;
  from?: string;
  to?: string;
}

interface IExpenseListProps {
  onChange: (filters: IExpenseListFilters) => void;
}

export default function ExpenseListFilters({ onChange }: IExpenseListProps) {
  const [filters, setFilters] = useState<IExpenseListFilters>({});
  const navigate = useNavigate();

  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prevFilters => ({ ...prevFilters, [e.target.name]: e.target.value }));
  }, []);

  useEffect(() => {
    onChange(filters);
  }, [filters, onChange]);

  const maxDate = useMemo(() => format(new UTCDate(), "yyyy-MM-dd"), []);

  const statusOptions = [
    { value: "", label: "All" },
    { value: ExpenseStatus.PENDING, label: "Pending ⏳" },
    { value: ExpenseStatus.ACCEPTED, label: "Accepted ✅" },
    { value: ExpenseStatus.REJECTED, label: "Rejected ❌" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      <Selector
        label="Status"
        name="status"
        value={filters.status}
        onChange={handleFilterChange}
        id="status"
        options={statusOptions.map(opt => opt.value)}
        displayOptions={statusOptions.map(opt => opt.label)}
      />
      <Input
        type="date"
        max={maxDate}
        label="From"
        name="from"
        id="from"
        placeholder="From Date"
        value={filters.from}
        onChange={handleFilterChange}
      />
      <Input
        type="date"
        max={maxDate}
        min={filters.from}
        label="To"
        name="to"
        id="to"
        placeholder="To Date"
        value={filters.to}
        onChange={handleFilterChange}
      />
      <div className="flex items-end">
        <Button
          onClick={() => navigate(ROUTES.NEW_EXPENSE)}
          text="Create new expense"
          aria-label="Create a new expense entry"
        />
      </div>
    </div>
  );
}
