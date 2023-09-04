import React, { Fragment, useEffect, useState } from 'react';
import Metadata from '../layout/Metadata';
import Loader from '../layout/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getCarDetails,  bookTestdrive, clearErrors } from '../../actions/carActions';
import { useAlert } from 'react-alert';
import { useParams, Link, useNavigate} from 'react-router-dom'; // useNaigate instead of useHistory in 
import { Carousel } from "react-bootstrap"; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const Testdrive = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate(); // Get the history object
  
    const { loading, error, car } = useSelector(state => state.carDetails);
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      dispatch(getCarDetails(id));
    }, [dispatch, alert, error, id]);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [customerInfo, setCustomerInfo] = useState({
      email: '',
      phoneNumber: '',
      drivingLicense: '',
      fullName: '',
      dateOfBirth: ''

      
    });

    const bookingData = {
        date: new Date(selectedDate).toISOString().substring(0, 10),
        time: new Date(selectedDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Format time as HH:mm
        email: customerInfo.email,
        fullName: customerInfo.fullName,
        phoneNumber: customerInfo.phoneNumber,
        dateOfBirth: new Date(customerInfo.dateOfBirth),
        drivingLicense: customerInfo.drivingLicense
        
    };



  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  
    const handleCustomerChange = (e) => {
      const { name, value } = e.target;
      setCustomerInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    };



    const handleConfirm = () => {
        dispatch(bookTestdrive(id, bookingData));
        alert.success('Congratulations! You have successfully booked a test drive');
         // Reset the state of input fields and selected date
        setCustomerInfo({
            email: '',
            phoneNumber: '',
            drivingLicense: '',
            fullName: '',
            dateOfBirth: ''
        });
        setSelectedDate(new Date());
    };
  
    return (
      <Fragment>
  
        {loading ? (
          <Loader />
        ) : car ? (
          <Fragment>
            <Metadata title= "book a testdrive" />
            <div className="testdrive-component">
                <div className="car-details-section">
                    <div className="car-details">
                    <div className="img-container">
                        {car.images && car.images.length > 0 && (
                        <Carousel pause="hover" slide={false} fade={true}>
                            {car.images.map((image) => (
                            <Carousel.Item key={image.public_id}>
                                <img
                                className="d-block w-100"
                                src={image.url}
                                alt={car.title}
                                />
                            </Carousel.Item>
                            ))}
                        </Carousel>
                        )}
                    </div>
                    
                    <div className="car-info">
                        <h2 style={{ color: '#438A38' }}>{car.title}</h2>
                        <p ><span style={{ color: '#4E7299', fontSize: "20px"}}>Price</span>: ${car.price}</p>
                        <p><span style={{ color: '#4E7299', fontSize: "20px"}}>Kilometers</span>: {car.kilometers} km</p>
                        <p><span style={{ color: '#4E7299', fontSize: "20px"}}>Engine Size</span>: {car.engineSize}</p>
                        <p><span style={{ color: '#4E7299', fontSize: "20px"}}>Transmission</span>: {car.transmission}</p>
                    </div>
                    </div>
                </div>

                <hr />

               <div className="time-picker-section">
                    <h3 className="section-title">Select Date and Time</h3>
                    <div className="time-picker-container">
                        <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="date-picker"
                        />
                    </div>
                    </div>

                    <div className="customer-details-section">
                        <h3 className="section-title">Customer Details</h3>
                        <div className="customer-details-container">
                            <div className="left-form">
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                type="email"
                                name="email"
                                value={customerInfo.email}
                                onChange={handleCustomerChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                type="tel"
                                name="phoneNumber"
                                value={customerInfo.phoneNumber}
                                onChange={handleCustomerChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Driver's License</label>
                                <input
                                type="text"
                                name="drivingLicense"
                                value={customerInfo.drivingLicense}
                                onChange={handleCustomerChange}
                                />
                            </div>
                            </div>
                            <div className="right-form">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                type="text"
                                name="fullName"
                                value={customerInfo.fullName}
                                onChange={handleCustomerChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input
                                type="date"
                                name="dateOfBirth"
                                value={customerInfo.dateOfBirth}
                                onChange={handleCustomerChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="confirm-button-section">
                    <div className="confirm-button">
                    <button onClick={handleConfirm}>Confirm Booking</button>
                    </div>
                </div>
            </div>

            
          </Fragment>
        ) : (
          <div>No car data available</div>
        )}
      </Fragment>
    );
  };

export default Testdrive