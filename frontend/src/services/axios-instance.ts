import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", 
});

// Intercepta requisições para adicionar o token JWT
api.interceptors.request.use((config) => {
localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODUxZTdlNWNjZDdhMjI5OGE5YzJlMzUiLCJpYXQiOjE3NTAyMDIwMjQsImV4cCI6MTc1MDgwNjgyNH0.IzMCH62XvIMKCeMDHlhOTTTHNbWXtzmoCOIvsuzp19I");
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
