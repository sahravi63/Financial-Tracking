import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Login successful:', result);
        onLogin(result); // Pass user data to parent
        navigate('/mainpage'); // Redirect to main page after login
      } else {
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className='login'>
      <h1>Login</h1>
      <input 
        className='inputBox' 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Enter Email'
      />
      <div className="passwordWrapper">
        <input 
          className='inputBox' 
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter Password'
        />
        <button type="button" onClick={togglePasswordVisibility} className="toggleButton">
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <button onClick={handleLogin} className='appButton' type='button'>
        Login
      </button>
    </div>
  );
};

export default Login;