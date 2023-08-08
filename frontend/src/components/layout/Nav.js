import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../App.css"

const Navigation = () => {
  // State to keep track of the active link
  const [activeLink, setActiveLink] = useState("");

  // Function to handle link click and set the active link
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className="navigation">
      <Link
        to="/"
        onClick={() => handleLinkClick("Home")}
        className={`nav-link ${activeLink === "Home" ? "active" : ""}`}
      >
        Home
      </Link>
      <Link
        to="/stock"
        onClick={() => handleLinkClick("Stock")}
        className={`nav-link ${activeLink === "Stock" ? "active" : ""}`}
      >
        Stock
      </Link>
      <Link
        to="/contact"
        onClick={() => handleLinkClick("Contact Us")}
        className={`nav-link ${activeLink === "Contact Us" ? "active" : ""}`}
      >
        Contact Us
      </Link>
      <Link
        to="/about"
        onClick={() => handleLinkClick("About Us")}
        className={`nav-link ${activeLink === "About Us" ? "active" : ""}`}
      >
        About Us
      </Link>
    </nav>
  );
};

export default Navigation;