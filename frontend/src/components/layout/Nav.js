import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../App.css";

import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

const Navigation = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  // State to keep track of the active link
  const [activeLink, setActiveLink] = useState("");

  // Function to handle link click and set the active link
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className="navigation">
      {user ? (
        <>
          <Link
            to="/dashboard"
            onClick={() => handleLinkClick("Dashboard")}
            className={`nav-link ${activeLink === "Dashboard" ? "active" : ""}`}
          >
            Dashboard
          </Link>
          <Link
            to="/stock"
            onClick={() => handleLinkClick("Stock")}
            className={`nav-link ${activeLink === "Stock" ? "active" : ""}`}
          >
            Stock
          </Link>
          <Link
            to="/add-vehicle"
            onClick={() => handleLinkClick("Add a Vehicle")}
            className={`nav-link ${activeLink === "Add a Vehicle" ? "active" : ""}`}
          >
            Add a Vehicle
          </Link>
          <Link
            to="/see-vehicle"
            onClick={() => handleLinkClick("See a Vehicle")}
            className={`nav-link ${activeLink === "See a Vehicle" ? "active" : ""}`}
          >
            See a Vehicle
          </Link>
        </>
      ) : (
        <>
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
        </>
      )}
    </nav>
  );
};

export default Navigation;
