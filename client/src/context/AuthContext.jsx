import React, { createContext, useState, useEffect, useContext } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Restore login from localStorage
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      setUser({ token });
    }

  }, []);

  const login = async (email, password) => {

    const data = await loginUser(email, password);

    localStorage.setItem("token", data.token);

    setUser(data);

    // 🔹 Redirect after login
    navigate("/dashboard");

  };

  const logout = () => {

    localStorage.removeItem("token");

    setUser(null);

    navigate("/");

  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => {
  return useContext(AuthContext);
};