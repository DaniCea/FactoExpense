import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // TODO: Move to .env

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Useful if using cookies for auth
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors for auth tokens
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;