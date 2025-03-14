import axios from './axiosInstance';

export const fetchTenants = async () => {
  try {
    return await axios.get('');
  } catch (error) {
    console.error('Error fetching data: ', error);
    // Handle errors here or throw them to be handled where the function is called
    throw error;
  }
};