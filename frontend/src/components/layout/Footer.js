import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
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
              <Link
                  to="/login" className="footer-link">Dealer Login
              </Link>
              </p>
            </div>

          </div>
        </div>
      </footer>
    </Fragment>

  )
}

export default Footer