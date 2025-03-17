import axios from './axiosInstance';

export interface ICreateExpenseProps {
  type: string;
  amount: number;
  description: string;
  expense_type: string;
}

export const getExpenses = async () => {
  try {
    return await axios.get('/expenses');
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