import React, { useState } from "react";
import { UserService } from "../../services/apiService";
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await UserService.registerUser({ name, email, password });
      alert('Registration successful!');
      setName(''); setEmail(''); setPassword('');
    } catch (err) {
      setError('Registration failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label>Full Name</label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} required />

      <label>Email</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

      <label>Password</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

      <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default Register;
