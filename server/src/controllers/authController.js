import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  let logoutTimer = null;

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
      scheduleAutoLogout(savedToken);
    }
    setLoading(false);

    return () => {
      if (logoutTimer) clearTimeout(logoutTimer);
    };
  }, []);

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

  function scheduleAutoLogout(jwt) {
    try {
      const { exp } = jwtDecode(jwt);
      const ms = exp * 1000 - Date.now();
      if (ms <= 0) {
        handleLogout();
      } else {
        logoutTimer = setTimeout(() => handleLogout(), ms);
      }
    } catch (e) {
      // invalid token
    }
  }

  const handleLogin = ({ user, token }) => {
    setUser(user);
    setToken(token);
    scheduleAutoLogout(token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, setUser: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
