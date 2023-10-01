import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Header = () => {
  const alert = useAlert();
  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data when the component mounts
    async function fetchUserData() {
      try {
        const res = await axios.get('/api/v1/me'); // Replace with your API endpoint
        if (res.data.success) {
          const userData = res.data.user;
          setUserData(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert.error('Failed to fetch user data');
      }
    }

    if (userFromLocalStorage) {
      fetchUserData();
    }
  }, [alert, userFromLocalStorage]);

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <img className="logoImg" src="/images/logo.png" alt="Logo" />
          </div>
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <i style={{ fontSize: '100%', verticalAlign: 'middle' }} className="material-icons">phone</i>
          {userData ? (
            <span>Call us: {userData.phone}</span>
          ) : (
            <span>Call us: Loading...</span>
          )}
          <br />
          <i style={{ fontSize: '100%', verticalAlign: 'middle' }} className="material-icons">email</i>
          {userData ? (
            <span>Email: {userData.email}</span>
          ) : (
            <span>Email: Loading...</span>
          )}
        </div>

        {userFromLocalStorage && (
          <div className="ml-4 dropdown d-inline">
            <a href="/admin/account" className="btn dropdown-toggle text-white" role="button">
              <i className="material-icons" style={{ color: "#4E7299" }}>account_circle</i>
            </a>
          </div>
        )}
      </nav>
    </Fragment>
  );
};

export default Header;
