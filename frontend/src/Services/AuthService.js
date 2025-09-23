// src/services/authService.js
import api from "./api";

export const register = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

export const login = async (credentials) => {
  const res = await api.post("/auth/login", credentials);
  // Guardar token
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
};


export const getMe = async () => {
  const res = await api.get('/auth/me');
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};
