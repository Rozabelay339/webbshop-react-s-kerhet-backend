import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../services/apiService"; 
import { useAuth } from "../../contexts/AuthContext";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      const { token, userData } = await UserService.loginUser(email, password); 
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData)); 
      setUser(userData); 
      console.log("User logged in:", userData);
      navigate('/'); 
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      
      <label>Password</label>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default Login;
