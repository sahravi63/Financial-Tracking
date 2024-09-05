import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const validatePassword = (password) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
    return password.length === 8 && regex.test(password);
  }

  const COLLECTDATA = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be 8 characters long and include at least one special character and one number");
      return;
    }

    setError("");
    console.warn(name, email, password);

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Registration successful:", result);
        navigate('/login');
      } else {
        // Handle specific error for already existing email
        if (result.error === 'Email already exists') {
          setError("This email is already registered. Please proceed to login.");
        } else {
          setError(result.error || "Registration failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Registration failed. Please try again.");
    }
  }

  const redirectToLogin = () => {
    navigate('/login');
  }

  return (
    <div className='register'>
      <h1>Create New Account</h1>
      <input 
        className='inputBox' 
        type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Enter name'
      />
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
      <div className="passwordWrapper">
        <input 
          className='inputBox' 
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='Confirm Password'
        />
        <button type="button" onClick={togglePasswordVisibility} className="toggleButton">
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <button onClick={COLLECTDATA} className='appButton' type='button'>
        Register
      </button>
      <div className="auth-buttons">
        <button onClick={redirectToLogin} className='appButton' type='button'>
          Login
        </button>
      </div>
    </div>
  );
};

export default SignUp;
