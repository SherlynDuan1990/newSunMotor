import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout, clearErrors } from '../../actions/userActions';
import axios from 'axios';

const Footer = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data when the component mounts
    async function fetchUserData() {
      try {
        const res = await axios.get('http://127.0.0.1:4000/api/v1/me'); // Replace with your API endpoint
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

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Fragment>
      <footer className="footer" style={{ backgroundColor: '#134883' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h4 className="footer-heading">Contact Us</h4>
              <p className="footer-text">
                {userData ? (
                  <Fragment>
                    {userData.name}, {userData.position} <br />
                    Phone: <span className="footer-emphasis">{userData.phone || 'N/A'}</span> <br />
                    Email: <span className="footer-emphasis">{userData.email || 'N/A'}</span>
                  </Fragment>
                ) : (
                  'Loading...'
                )}
              </p>
            </div>

            <div className="col-md-4">
              <h4 className="footer-heading">Find Us</h4>
              <p className="footer-text">
                Phone: <span className="footer-emphasis">{userData ? userData.phone || 'N/A' : 'Loading...'}</span> <br />
                Email: <span className="footer-emphasis">{userData ? userData.email || 'N/A' : 'Loading...'}</span> <br />
                Address: <span className="footer-emphasis">Your New Address Here</span>
              </p>
            </div>

            <div className="col-md-4">
              <h4 className="footer-heading">Opening Hours</h4>
              <p className="footer-text">
                Mon-Fri: <span className="footer-emphasis">9:00-5:00</span> <br />
                Sat: <span className="footer-emphasis">9:00-12:00</span> <br />
                Sun: <span className="footer-emphasis">Closed</span>
              </p>
              <p>
                {!userFromLocalStorage ? (
                  <Link to="/login" className="footer-link" style={{ color: 'white', paddingLeft: '5px', fontSize: '22px' }}>
                    Dealer Login
                  </Link>
                ) : (
                  <div>
                    <Link onClick={handleLogout} style={{ color: 'white', paddingLeft: '5px', fontSize: '22px' }} to="/">
                      Log out
                    </Link>
                  </div>
                )}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
