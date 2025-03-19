import axios from './axiosInstance';


export interface IGetExpensesParams {
  from?: string;
  to?: string;
  status?: string;
}

export interface ICreateExpenseParams {
  type: string;
  amount: number;
  description: string;
  expense_type: string;
}

export interface IUpdateExpenseStatusParams {
  expenseId: string;
  status: string;
}

export const getExpenses = async ({ from, to, status }: IGetExpensesParams = {}) => {
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

export const createExpense = async (expense: ICreateExpenseParams) => {
  try {
    return await axios.post('/expenses', expense);
  } catch (error) {
    throw error;
  }
}

export const updateExpenseStatus = async ({ expenseId, status }: IUpdateExpenseStatusParams) => {
  try {
    return await axios.patch(`/expenses/${expenseId}/status`, { status });
  } catch (error) {
    throw error;
  }
}