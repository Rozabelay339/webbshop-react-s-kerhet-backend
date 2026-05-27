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
    console.log("Saved user:", savedUser);
console.log("Saved token:", savedToken);
console.log("Current React user:", user);
    if (savedToken) {
      try {
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          const decodedUser = jwtDecode(savedToken);
          if (decodedUser?.id) setUser({ id: decodedUser.id });
        }
        setToken(savedToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
        scheduleAutoLogout(savedToken);
      } catch {
        handleLogout();
      }
    }
    setLoading(false);

    return () => {
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
    };
  }, [handleLogout, scheduleAutoLogout]);

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
    console.log("Login data:", { user, userData, token });
    const currentUser = user || userData;
    if (!currentUser || !token) {
      throw new Error("Login response did not include a valid user and token.");
    }

    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(currentUser);
    setToken(token);
    scheduleAutoLogout(token);

    return { user: currentUser, token };
  }, [scheduleAutoLogout]);

  return (
    <AuthContext.Provider
  value={{
    user,
    token,
    loading,
    login: handleLogin,
    setUser,
    logout: handleLogout
  }}
>
      {children}
    </AuthContext.Provider>
  );
};
