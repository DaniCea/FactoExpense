// src/api.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/tenants';

const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: false,
    timeout: 1000,
});

export const fetchTenants = async () => {
    try {
        return await instance.get('');
    } catch (error) {
        console.error('Error fetching data: ', error);
        // Handle errors here or throw them to be handled where the function is called
        throw error;
    }
};