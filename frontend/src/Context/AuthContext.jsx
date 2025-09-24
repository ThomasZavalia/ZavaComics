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
     localStorage.setItem('token', data.token);


    const userDecoded = decodeJWT(data.token);
    if (!userDecoded) throw new Error("Token inválido");

    try {
      const userData = await getMe();
      setUser ({
        id: userData.id,
        nombre: userData.nombre,
        role: userData.rol, 
      });
    } catch (err) {
      // Fallback a decoded si fetch falla
      setUser ({
        id: userDecoded.id,
        nombre: '', // O fetch separado si necesitas
        role: userDecoded.rol,
      });
    }
  };

  const register = async (userData) => {
  const data = await registerService(userData); // { id, nombre, email, rol }

  if (!data || !data.id) throw new Error("Registro fallido");
  await login({ email: userData.email, password: userData.password });

  setUser({
    id: data.id,
    nombre: data.nombre,
    rol: data.rol,
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
