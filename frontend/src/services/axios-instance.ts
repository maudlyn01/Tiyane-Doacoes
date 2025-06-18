import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // Altere conforme seu backend
});

// Intercepta requisições para adicionar o token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
