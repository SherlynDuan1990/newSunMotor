
import React, { Fragment, useState } from 'react';
import Metadata from './layout/Metadata';
import Loader from './layout/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { contactUs, clearErrors } from '../actions/contactUsActions';
import { useAlert } from 'react-alert';

const ContactUs = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, contactUsData } = useSelector(state => state.contactUs);

    const [customerInfo, setCustomerInfo] = useState({
    email: '',
    phone: '',
    fullName: '',
    message: ''
    
    });

    const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
    }));
    };
  
  
    const handleConfirm = () => {
        if (
            !customerInfo.email ||
            !customerInfo.phone ||
            !customerInfo.fullName ||
            !customerInfo.message
          ) {
            alert.error('All fields are required');
            return;
          }

        dispatch(contactUs(customerInfo));
        alert.success('Congratulations! You have successfully sent us an enquiry, we will get back to you very soon');
        // Reset the state of input fields and selected date
        setCustomerInfo({
            email: '',
            phone: '',
            fullName: '',
            message: ''
        });
    };

    
    return (
        <Fragment>
    
          {loading ? (
            <Loader />
          ) :  (
            <Fragment>
              <Metadata title= "Contact Us" />
                <div className="customer-details-section">
                    <h3 className="section-title">Contact Us</h3>
                    <div className="customer-details-container">
                        <div className="left-form">
                            <div className="form-group">
                                <label>Email Address *</label>
                                <input
                                type="email"
                                name="email"
                                value={customerInfo.email}
                                onChange={handleCustomerChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number *</label>
                                <input
                                type="tel"
                                name="phone"
                                value={customerInfo.phone}
                                onChange={handleCustomerChange}
                                />
                            </div>
                        </div>
                        <div className="right-form">
                            <div className="form-group">
                                <label>Full Name *</label>
                                <input
                                type="text"
                                name="fullName"
                                value={customerInfo.fullName}
                                onChange={handleCustomerChange}
                                />
                            </div>                       
                        </div> 
                    </div>
                </div>

            <div className="customer-details-section">
                <h3 className="section-title">Message *</h3>
                    <div className="form-group " >
                        <label>Please leave your message</label>
                        <textarea
                            name="message"
                            value={customerInfo.message}
                            onChange={handleCustomerChange}
                            style={{ width: '100%', height: '40%', minHeight: '100px' , paddingLeft: '20px'}}
                        />
                    </div>
            </div>
                <div className="confirm-button-section">
                    <div className="confirm-button">
                    <button onClick={handleConfirm} >Send</button>  
                    </div>
                </div>
            
              
            </Fragment>
          )}
        </Fragment>
      );
    };

export default ContactUs