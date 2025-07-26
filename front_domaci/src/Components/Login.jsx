import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === 'nikola.rancic@example.com' && password === 'password123') {
      sessionStorage.setItem('role', 'admin');
      navigate('/podkasti');
    } else if (email === 'milan.nikolic@example.com' && password === 'password123') {
      sessionStorage.setItem('role', 'creator');
      navigate('/podkasti');
    } else {
      sessionStorage.setItem('role', 'viewer');
      navigate('/podkasti');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo">
          <h1>PODKAST PLATFORMA</h1>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Lozinka"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">
            Prijavi se
          </button>
        </form>
        <div className="register-link">
          Nemaš nalog? <Link to="/register">Registruj se ovde</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
