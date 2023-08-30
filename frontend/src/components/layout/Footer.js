import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout, clearErrors } from '../../actions/userActions';



const Footer = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  // const { user, loading } = useSelector((state) => state.auth);  due to the user state is initially being loaded when the page refreshes, so using user state as a condition to display different contents for different interfaces is not working as i expected
  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

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
                Henry He Sales Manager <br />
                Phone: <span className="footer-emphasis">07 8467888, 022 6989700</span> <br />
                Email: <span className="footer-emphasis">henryaax@gmail.com</span>
              </p>
            </div>

            <div className="col-md-4">
              <h4 className="footer-heading">Find Us</h4>
              <p className="footer-text">
                Phone: <span className="footer-emphasis">07 8467888, 022 6989700</span> <br />
                Email: <span className="footer-emphasis">henryaax@gmail.com</span> <br />
                Address: <span className="footer-emphasis">718b Te Rapa Road, Te Rapa, Hamilton</span>
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

  )
}

export default Footer