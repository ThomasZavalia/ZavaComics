import { createContext, useState } from "react";
import { login as loginService, register as registerService, logout as logoutService } from "../Services/AuthService";

export const AuthContext = createContext();

const decodeJWT = (token) => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const data = await loginService(credentials); // { token }

    if (!data || !data.token) throw new Error("Login fallido");

    const userDecoded = decodeJWT(data.token);
    if (!userDecoded) throw new Error("Token inválido");

    setUser({
      id: userDecoded.id,
      nombre: userDecoded.nombre,
      role: userDecoded.role,
    });
  };

  const register = async (userData) => {
  const data = await registerService(userData); // { id, nombre, email, rol }

  if (!data || !data.id) throw new Error("Registro fallido");

  setUser({
    id: data.id,
    nombre: data.nombre,
    role: data.rol,
  });
};

  const logout = () => {
    logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
