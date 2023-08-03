import React, {Fragment} from 'react'
import "../../App.css"



const Header = () => {
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
            </nav>  

            
    </Fragment>
  )
}

export default Header