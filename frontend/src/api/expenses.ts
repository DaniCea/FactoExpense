import axios from './axiosInstance';

interface IMilleageExpenseProps {
  mileage_in_km: number;
}

export interface IGetExpensesProps {
  from?: string;
  to?: string;
  status?: string;
}

export interface ICreateExpenseProps {
  type: string;
  amount: number;
  description: string;
  expense_type: string;
  mileage_expense?: IMilleageExpenseProps;
}

export const getExpenses = async ({ from, to, status }: IGetExpensesProps = {}) => {
  try {
    const params = new URLSearchParams();

    if (from) params.append("from", from);
    if (to) params.append("to", to);
    if (status) params.append("status", status);

    const queryString = params.toString();
    const url = queryString ? `/expenses?${queryString}` : "/expenses";

    return await axios.get(url);
  } catch (error) {
    throw error;
  }
};

export const createExpense = async (expense: ICreateExpenseProps) => {
  try {
    return await axios.post('/expenses', expense);
  } catch (error) {
    throw error;
  }
}