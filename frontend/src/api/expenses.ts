import axios from './axiosInstance';
import { AxiosResponse } from "axios";
import { Expense } from "../models/Expense";
import { serializeExpense } from "./serializers/ExpenseSerializer";

// Request params GET /expenses
export interface IGetExpensesRequestParams {
  from?: string;
  to?: string;
  status?: string;
}

// Response params GET /expenses
export interface IGetExpensesResponseParams {
  id: number;
  title: string;
  description: string;
  amount: number;
  status: string;
  expenseable_type: string;
  created_at: string;
  expenseable?: {
    type: string;
    travel_expense?: {
      trip_id: number;
      travel_expenseable_type: string;
      travel_expenseable: {
        type: string;
        transportation_travel_expense?: {
          id: number;
          transportation_mode: string;
          route: string;
        };
        accommodation_travel_expense?: {
          id: number;
          hotel_name: string;
          check_in_date: string;
          check_out_date: string;
        };
      };
    };
    mileage_expense?: {
      id: number;
      mileage_in_km: string;
    };
  };
}

// Serialized
export interface ICreateExpenseBody {
  title: string;
  amount: number;
  expense_type: string;
  travel_expense_type?: string;
  description?: string;
  hotel_name?: string;
  check_in_date?: string;
  check_out_date?: string;
  transportation_mode?: string;
  route?: string;
  mileage_in_km?: string;
}

export interface IUpdateExpenseStatusParams {
  expenseId: number;
  status: string;
}

export const getExpenses = async ({ from, to, status }: IGetExpensesRequestParams = {}): Promise<Expense[]> => {
  const params = new URLSearchParams();

  if (from) params.append("from", from);
  if (to) params.append("to", to);
  if (status) params.append("status", status);

  const queryString = params.toString();
  const url = queryString ? `/expenses?${queryString}` : "/expenses";

  const response: AxiosResponse<IGetExpensesResponseParams[]> = await axios.get(url);

  const data: IGetExpensesResponseParams[] = response.data;

  return data.map(serializeExpense);
};

export const createExpense = async (expenseBody: ICreateExpenseBody) => {
  return await axios.post('/expenses', expenseBody);
}

export const updateExpenseStatus = async ({ expenseId, status }: IUpdateExpenseStatusParams) => {
  return await axios.patch(`/expenses/${expenseId}/status`, { status });
}