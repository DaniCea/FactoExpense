import axios from "axios";

const API_BASE_URL = "https://localhost:443"; // TODO: Move to .env

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Useful if using cookies for auth
  headers: {
    "Content-Type": "application/json"
  },
});

// Optional: Add interceptors for auth tokens

export default axiosInstance;