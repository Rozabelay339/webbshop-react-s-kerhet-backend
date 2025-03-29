import React, { useState } from 'react';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register

  return (
    <div>
      {isLogin ? (
        <div>
          <Login />
          <p>
            Don't have an account?{' '}
            <button onClick={() => setIsLogin(false)}>Register</button>
          </p>
        </div>
      ) : (
        <div>
          <Register />
          <p>
            Already have an account?{' '}
            <button onClick={() => setIsLogin(true)}>Login</button>
          </p>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
