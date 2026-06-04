import React, { useCallback, useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { AuthContext } from "./authContextValue";

const getStoredToken = () => localStorage.getItem("token");

const normalizeUser = (sessionUser, jwt) => {
  const source = sessionUser || {};
  let decoded = null;

  if (jwt) {
    try {
      decoded = jwtDecode(jwt);
    } catch {
      decoded = null;
    }
  }

  const id = source.id || source._id || decoded?.id;
  if (!id) return null;

  return {
    ...source,
    id,
    _id: source._id || id,
  };
};

const getStoredUser = () => {
  const savedUser = localStorage.getItem("user");
  const savedToken = getStoredToken();

  try {
    return savedUser ? normalizeUser(JSON.parse(savedUser), savedToken) : normalizeUser(null, savedToken);
  } catch {
    return normalizeUser(null, savedToken);
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);
  const [token, setToken] = useState(getStoredToken);
  const [loading, setLoading] = useState(true);
  const logoutTimer = useRef(null);

  const handleLogout = useCallback(() => {
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    logoutTimer.current = null;
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }, []);

  const scheduleAutoLogout = useCallback((jwt) => {
    try {
      const { exp } = jwtDecode(jwt);
      const ms = exp * 1000 - Date.now();

      if (ms <= 0) {
        handleLogout();
        return;
      }

      if (logoutTimer.current) clearTimeout(logoutTimer.current);
      logoutTimer.current = setTimeout(handleLogout, ms);
    } catch {
      handleLogout();
    }
  }, [handleLogout]);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return undefined;
    }

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    scheduleAutoLogout(token);
    setLoading(false);

    return () => {
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
    };
  }, [token, scheduleAutoLogout]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common.Authorization;
    }
  }, [token]);

  const handleLogin = useCallback((session) => {
    const jwt = session?.token;
    const currentUser = normalizeUser(session?.user || session?.userData, jwt);

    if (!currentUser || !jwt) {
      throw new Error("Login response did not include a valid user and token.");
    }

    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("token", jwt);
    axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;
    setUser(currentUser);
    setToken(jwt);
    scheduleAutoLogout(jwt);

    return { user: currentUser, token: jwt };
  }, [scheduleAutoLogout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: Boolean(token),
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
