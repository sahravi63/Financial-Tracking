import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import DashBoard from './components/DashBoard/dashboard';
import MainPage from './components/mainpage/mainpage';
import Profile from './components/profile';
import Home from './components/Home/homepage'; // Adjust path if needed

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Nav isLoggedIn={isLoggedIn} user={user} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home page route */}
            <Route path="/dashboard" element={isLoggedIn ? <DashBoard /> : <Navigate to="/" />} />
            <Route path="/mainpage" element={isLoggedIn ? <MainPage /> : <Navigate to="/" />} />
            <Route path="/profile" element={isLoggedIn ? <Profile user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
            <Route path="/contact-us" element={<h1>Contact Us</h1>} />
            <Route path="/more" element={<h1>More</h1>} />
            <Route path="/search" element={<h1>Search</h1>} />
            <Route path="/globe" element={<h1>Globe</h1>} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<h1>404 - Not Found</h1>} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
