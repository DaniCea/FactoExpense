import axios from './axiosInstance';

export const getExpenses = async () => {
  try {
    return await axios.get('/expenses');
  } catch (error) {
    throw error;
  }
};