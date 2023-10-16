import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_BASE_URL; 

const Header = () => {
  const alert = useAlert();
  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
  const [userData, setUserData] = useState(null);

  // Define a CSS style object to set the background color
  const headerStyle = {
    height: '120px',
    marginLeft: '40px',
    marginRight: '40px',
    marginTop: '20px',
    marginBottom: '20px',
  };

  useEffect(() => {
    // Fetch user data when the component mounts
    async function fetchUserData() {
      try {
        const res = await axios.get(`${apiUrl}/api/v1/me`); // Replace with your API endpoint

        if (res.data.success) {
          const userData = res.data.user;
          setUserData(userData);
          
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData(); // Call fetchUserData unconditionally

  }, []);

  return (
    <Fragment>
      <nav className="navbar row" style={headerStyle}>
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <img className="logoImg" src="/images/logo.png" alt="Logo" />
          </div>
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <i style={{ fontSize: '100%', verticalAlign: 'middle' }} className="material-icons">phone</i>
          <span>
            Call us: {userData ? userData.phone : 'Loading...'}
          </span>
          <br />
          <i style={{ fontSize: '100%', verticalAlign: 'middle' }} className="material-icons">email</i>
          <span>
            Email: {userData ? userData.email : 'Loading...'}
          </span>
        </div>

        {userFromLocalStorage && (
          <div className="ml-4 dropdown d-inline">
            <a href="#/admin/account" className="btn dropdown-toggle text-white" role="button">
              <i className="material-icons" style={{ color: "#4E7299" }}>account_circle</i>
            </a>
          </div>
        )}
      </nav>
    </Fragment>
  );
};

export default Header;
