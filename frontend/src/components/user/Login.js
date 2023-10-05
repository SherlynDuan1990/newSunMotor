import React, { Fragment, useEffect, useState } from 'react';
import {Link } from "react-router-dom"

import Metadata from '../layout/Metadata';
import Loader from '../layout/Loader';

import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrors } from '../../actions/userActions';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); 
    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

    useEffect(() => {

        if(isAuthenticated){
            navigate("/admin/dashboard")
        }

        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
      }, [dispatch, alert, isAuthenticated, error]);

    const submitHandler =(e)=> {
        e.preventDefault();
        dispatch(login(email,password))
    }


    return (
    <Fragment>
    
          {loading ? (
            <Loader />
          ) :  (
            <Fragment>
              <Metadata title= "login" />   
                <div className="row wrapper"> 
                    <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 style={{color: "#438A38"}} className="mb-3">Dealer Login</h1>
                        <div className="form-group">
                        <label htmlFor="email_field">Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        </div>
            
                        <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </div>

                        {/* <Link to="/passwod/forgot" className="float-right mb-4">Forgot Password?</Link> */}
            
                        <button
                        id="login_btn"
                        type="submit"
                        className="btn btn-block py-3"
                        >
                        LOGIN
                        </button>

                        
                    </form>
                    </div>
                </div>


    </Fragment>
          )}
        </Fragment>
      );
    };


export default Login