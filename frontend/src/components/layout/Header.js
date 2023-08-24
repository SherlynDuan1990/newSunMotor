import React, {Fragment} from 'react'
import "../../App.css"

import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';



const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const {user, loading } = useSelector((state) => state.auth);


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

            {user && (
              <div className="ml-4 dropdown d-inline">
                <button className="btn dropdown-toggle text-white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="material-icons" style={{ color: "#4E7299" }}>account_circle</i>
                </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                  <Link className="dropdown-item" style={{ color: "#438A38", fontSize:"22px"}} to="/">
                    Log out
                  </Link>
                </div>
              </div>
            )}
            </nav>  

            
    </Fragment>
  )
}

export default Header