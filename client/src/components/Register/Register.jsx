import React, { useState } from 'react';
import { UserService } from "../../services/ApiService";
import './Register.css';  // Importing the CSS file

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await UserService.registerUser({ email, password, name });
      alert('Registration successful!');
      setEmail('');
      setPassword('');
      setName('');
    } catch (err) {
      setError('Error during registration: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <label>Full Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label>Password</label>
      <input
        type=""
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>

      {error && <p className="error-message">{error}</p>}  {/* Using the error-message class */}
    </form>
  );
};

export default Register;
