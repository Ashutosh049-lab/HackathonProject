import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "https://hackathonproject-4.onrender.com",
});

// ✅ Attach token for protected requests only
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  
  // Don't attach token for auth routes (register, login)
  const isAuthRoute = config.url?.includes('/auth/register') || config.url?.includes('/auth/login');
  
  if (token && !isAuthRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
