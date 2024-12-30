import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome to the Mutual Fund App</h1>
      <p className="homepage-description">Your one-stop solution for managing mutual fund investments.</p>
      <div className="homepage-actions">
        <Link to="/login">
          <button className="homepage-button">Login</button>
        </Link>
        <Link to="/register">
          <button className="homepage-button">Register</button>
        </Link>
      </div>
    </div>
  );
};
  
export default Homepage;