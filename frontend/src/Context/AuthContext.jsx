// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { login as loginService, register as registerService, logout as logoutService } from "../Services/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login
  const login = async (credentials) => {
    const data = await loginService(credentials);
    setUser({ id: data.user.id, nombre: data.user.nombre, role: data.user.role });
  };

  // Registro
  const register = async (userData) => {
    const data = await registerService(userData);
    setUser({ id: data.user.id, nombre: data.user.nombre, role: data.user.role });
  };

  // Logout
  const logout = () => {
    logoutService();
    setUser(null);
  };

  useEffect(() => {
    // opcional: validar si hay token al recargar
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
