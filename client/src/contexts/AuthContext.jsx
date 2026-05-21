import React, { createContext, useCallback, useContext, useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode"; 
import axios from "axios";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const logoutTimer = useRef(null);

  const handleLogout = useCallback(() => {
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }, []);

  const scheduleAutoLogout = useCallback((jwt) => {
    try {
      const { exp } = jwtDecode(jwt);
      const ms = exp * 1000 - Date.now();
      if (ms <= 0) {
        handleLogout();
      } else {
        if (logoutTimer.current) clearTimeout(logoutTimer.current);
        logoutTimer.current = setTimeout(() => handleLogout(), ms);
      }
    } catch {
      handleLogout();
    }
  }, [handleLogout]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
      }
      setToken(savedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
      scheduleAutoLogout(savedToken);
    }
    setLoading(false);

    return () => {
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
    };
  }, [scheduleAutoLogout]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const handleLogin = useCallback(({ user, userData, token }) => {
    const currentUser = user || userData;
    if (!currentUser || !token) return;

    setUser(currentUser);
    setToken(token);
    scheduleAutoLogout(token);
  }, [scheduleAutoLogout]);

  return (
    <AuthContext.Provider value={{ user, token, loading, login: handleLogin, setUser: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
