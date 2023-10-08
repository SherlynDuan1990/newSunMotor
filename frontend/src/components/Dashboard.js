import React, { Fragment, useState, useEffect } from 'react';
import { getListingVehicles, clearErrors } from '../actions/carActions';

import Metadata from './layout/Metadata';
import Loader from './layout/Loader';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_BASE_URL; 

const Dashboard = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, listingVehicles } = useSelector((state) => state.listingVehicles);

  const [showAllCustomers, setShowAllCustomers] = useState(false);
  const [soldVehicleCount, setSoldVehicleCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true); // Add loading state for customers

  // Define the getCustomers function here
  const getCustomers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/admin/customers`);
      const customersData = response.data;
      // Check if customersData is an object with a 'customers' property
      if (customersData && Array.isArray(customersData.customers)) {
        const customersArray = customersData.customers;
        setCustomers(customersArray);
        console.log(customersArray)
        setLoadingCustomers(false);
      } else {
        // Handle the case where customersData is not in the expected format
        console.error('Invalid data format for customers:', customersData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getListingVehicles());
    handleTimeRangeSelect('lastMonth');
    getCustomers(); // Fetch customer data
  }, [dispatch, alert, error]);

  const handleTimeRangeSelect = async (selectedTimeRange) => {
    try {
      const response = await axios.post(`${apiUrl}/api/v1/car/dashboard/soldVehicles`, {
        timeRange: selectedTimeRange,
      });

      const { soldVehicleCount: newSoldVehicleCount, totalAmount: newTotalAmount } = response.data.data;
      setSoldVehicleCount(newSoldVehicleCount);
      setTotalAmount(newTotalAmount);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleShowAllCustomers = () => {
    setShowAllCustomers(!showAllCustomers);
  };

  return (
    <Fragment>
      <Metadata title={'Dashboard'} />

      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="dashboard">
            <div className="vehicle-listing-section">
              <h2 className="section-heading">Vehicle Listings</h2>
              <ul>
                <li className="sub-header">
                  Total Vehicles: <span className="number">{listingVehicles.totalCars}</span>
                </li>
                <li className="sub-header">
                  Listing: <span className="number">{listingVehicles.listingCount}</span>
                </li>
                <li className="sub-header">
                  On Hold: <span className="number">{listingVehicles.onHoldCount}</span>
                </li>
                <li className="sub-header">
                  In Transit: <span className="number">{listingVehicles.inTransitCount}</span>
                </li>
              </ul>
            </div>
            <div className="sold-vehicles-section">
              <h2 className="section-heading">Sold Vehicles</h2>
              <div className="sales-filter">
                <label className="dashboard-label">Select Time Range:</label>
                <select className="select" onChange={(e) => handleTimeRangeSelect(e.target.value)}>
                  <option value="lastMonth">Last Month</option>
                  <option value="lastThreeMonths">Last Three Months</option>
                  <option value="lastSixMonths">Last Six Months</option>
                  <option value="lastYear">Last Year</option>
                </select>
              </div>
              <div className="sales-summary">
                <p className="sub-header">
                  Quantity: <span className="number">{soldVehicleCount}</span>
                </p>
                <p className="sub-header">
                  Total Sold Amount: <span className="number">${totalAmount}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="recent-customers-section">
            <h2 className="section-heading">Recent Customers</h2>
            <div className="customer-container">
              <div className="customer-info-label">
                <p className="label">Full Name</p>
                <p className="label">Email Address</p>
                <p className="label">Phone Number</p>
              </div>
              {loadingCustomers ? ( // Display loading message while customers data is loading
                <p>Loading customers...</p>
              ) : (
                <ul className="customer-list">
                  {showAllCustomers
                    ? customers.reverse().map((customer) => (
                        <li key={customer._id} className="customer-item">
                          <span className="customer-info">{customer.fullName}</span>
                          <span className="customer-info">{customer.emailAddress}</span>
                          <span className="customer-info">{customer.phoneNumber}</span>
                        </li>
                      ))
                    : customers.slice(-5).reverse().map((customer) => (
                        <li key={customer._id} className="customer-item">
                          <span className="customer-info">{customer.fullName}</span>
                          <span className="customer-info">{customer.emailAddress}</span>
                          <span className="customer-info">{customer.phoneNumber}</span>
                        </li>
                      ))}
                </ul>
              )}
            </div>
            <button className="show-all-button" onClick={toggleShowAllCustomers}>
              {showAllCustomers ? 'Show Less' : 'Show All'}
            </button>
          </div>

          </div>
      )}
    </Fragment>
  );
};

export default Dashboard;
