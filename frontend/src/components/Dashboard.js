import React , { Fragment, useState, useEffect }from 'react'
import { getListingVehicles, clearErrors } from '../actions/carActions';

import Metadata from './layout/Metadata';
import Loader from './layout/Loader';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';



const Dashboard = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, listingVehicles } = useSelector(state => state.listingVehicles);

  useEffect(() => {
      if (error) {
      alert.error(error);
      dispatch(clearErrors());
      }

      dispatch(getListingVehicles());
  }, [dispatch, alert, error]);


  const [showAllCustomers, setShowAllCustomers] = useState(false);

  // Function to toggle showing all customers
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
            <li className='"sub-header'>
              Total Vehicles: <span className="number">{listingVehicles.totalCars}</span>
            </li>
            <li className='"sub-header'>
              Listing: <span className="number">{listingVehicles.listingCount}</span>
            </li>
            <li className='"sub-header'>
              On Hold: <span className="number">{listingVehicles.onHoldCount}</span>
            </li>
            <li className='"sub-header'>
              In Transit: <span className="number">{listingVehicles.inTransitCount}</span>
            </li>
            

          </ul>
        </div>
        <div className="sold-vehicles-section">
          <h2 className="section-heading">Sold Vehicles</h2>
          <div className="sales-filter">
            <label className="dashboard-label">Select Time Range:</label>
            <select className="select">
              <option value="lastMonth">Last Month</option>
              <option value="lastThreeMonths">Last Three Months</option>
              <option value="lastSixMonths">Last Six Months</option>
              <option value="lastYear">Last Year</option>
            </select>
          </div>
          <div className="sales-summary">
            <p className="sub-header">
              Quantity: <span className="number">5</span>
            </p>
            <p className="sub-header">
              Total Sold Amount: <span className="number">$50000</span>
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
              <ul className="customer-list">
              {!showAllCustomers ? (
                  <>
                  <li className="customer-item">
                      <span className="customer-info">John Doe</span>
                      <span className="customer-info">john@example.com</span>
                      <span className="customer-info">123-456-7890</span>
                  </li>
                  <li className="customer-item">
                      <span className="customer-info">Jane Smith</span>
                      <span className="customer-info">jane@example.com</span>
                      <span className="customer-info">987-654-3210</span>
                  </li>
                  {/* Add more customer list items here */}
                  </>
              ) : (
                  // Display all customers when showAllCustomers is true
                  <>
                  <li className="customer-item">
                      <span className="customer-info">John Doe</span>
                      <span className="customer-info">john@example.com</span>
                      <span className="customer-info">123-456-7890</span>
                  </li>
                  <li className="customer-item">
                      <span className="customer-info">Jane Smith</span>
                      <span className="customer-info">jane@example.com</span>
                      <span className="customer-info">987-654-3210</span>
                  </li>
                  {/* Add more customer list items here */}
                  {/* You can include all your customer data here */}
                  </>
              )}
              </ul>
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
