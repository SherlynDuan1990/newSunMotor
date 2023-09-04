import React, {Fragment} from 'react'
import "../../App.css"

import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';




const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  // const { user, loading } = useSelector((state) => state.auth);  due to the user state is initially being loaded when the page refreshes, so using user state as a condition to display different contents for different interfaces is not working as i expected
  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));


  return (
    <Fragment>
        <nav className="navbar row">
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                <img  className="logoImg" src="/images/logo.png" />
                </div>
            </div>

           

            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                <i style={{ fontSize: '100%', verticalAlign: 'middle' }} className="material-icons">phone</i> Call us: 07 8467888
                <br />
                <i style={{ fontSize: '100%', verticalAlign: 'middle' }}className="material-icons">email</i> Email: henryaax@gmail.com
            </div>

            {userFromLocalStorage && (
              <div className="ml-4 dropdown d-inline">
                <button className="btn dropdown-toggle text-white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="material-icons" style={{ color: "#4E7299" }}>account_circle</i>
                </button>

              </div>
            )}
          </nav>  

            
    </Fragment>
  )
}

export default Header