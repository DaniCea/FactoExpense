import axios from "axios";

const API_BASE_URL = "https://localhost:3000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  },
});

export default axiosInstance;