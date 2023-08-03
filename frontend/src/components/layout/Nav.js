import React from 'react';
import { Link } from 'react-router-dom';
import "../../App.css"

const Navigation = () => {
  return (
    <nav className="navigation">
      <Link to="/" className="nav-link active">Home</Link>
      <Link to="/stock" className="nav-link">Stock</Link>
      <Link to="/contact" className="nav-link">Contact Us</Link>
      <Link to="/about" className="nav-link">About Us</Link>
    </nav>
  );
};

export default Navigation;