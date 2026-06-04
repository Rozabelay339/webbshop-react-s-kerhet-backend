import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserService } from "../../services/apiService";
import { useAuth } from "../../contexts/authContextValue";
import "./Login.css";

const getReturnPath = (from) => {
  if (typeof from === "string") return from;
  if (from?.pathname) return `${from.pathname}${from.search || ""}${from.hash || ""}`;
  return "/products";
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const returnTo = getReturnPath(location.state?.from);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const session = await UserService.loginUser(email, password);
      const authenticatedSession = login(session);
      navigate(returnTo, { replace: true, state: { authToken: authenticatedSession.token } });
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label>Email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

      <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default Login;
