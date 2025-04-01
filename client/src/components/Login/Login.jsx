import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../services/ApiService";
import { useAuth } from "../../contexts/AuthContext"; // Import the Auth context
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth(); // Access setUser to update the user context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      const { token, userData } = await UserService.loginUser(email, password); // Assume userData is returned from API
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData)); // Store user in localStorage
      setUser(userData); // Set user data to context
      console.log("User logged in:", userData); // Debugging: Check if user data is correct
      navigate('/'); // Redirect to home page
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
