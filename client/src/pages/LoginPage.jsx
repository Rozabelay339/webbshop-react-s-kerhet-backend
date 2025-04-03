import React, { useState } from 'react';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true); 

  return (
    <div className="login-page-container">
      {isLogin ? (
        <div>
          <Login />
          <div className="toggle-form-link">
            <p>
              Don't have an account?{' '}
              <button onClick={() => setIsLogin(false)}>Register</button>
            </p>
          </div>
        </div>
      ) : (
        <div>
          <Register />
          <div className="toggle-form-link">
            <p>
              Already have an account?{' '}
              <button onClick={() => setIsLogin(true)}>Login</button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
