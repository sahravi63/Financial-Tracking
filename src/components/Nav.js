import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ isLoggedIn, user }) => {
  return (
    <div>
      <ul className="nav-ul">
        {isLoggedIn ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/contact-us">Contact Us</Link></li>
            <li><Link to="/more">More</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/globe">Globe</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Nav;
