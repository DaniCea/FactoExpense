import axios from './axiosInstance';

export const getExpenses = async () => {
  try {
    debugger;
    return await axios.post('/expenses');
  } catch (error) {
    throw error;
  }
};