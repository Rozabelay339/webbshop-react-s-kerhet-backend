import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserService } from "../../services/apiService"; 
import { useAuth } from "../../contexts/AuthContext";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const returnTo = location.state?.from || '/products';
  console.log("ReturnTo:", returnTo);
console.log("Location state:", location.state);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
     const session = await UserService.loginUser(email, password);

await login(session);

console.log("Login finished");
console.log("Navigating to:", returnTo);

setTimeout(() => {
  navigate(returnTo, { replace: true });
}, 100);
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label>Email</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

      <label>Password</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

      <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default Login;
