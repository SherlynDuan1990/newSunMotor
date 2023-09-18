import React from 'react';


const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="vehicle-listing-section">
        <h2 className="section-heading">Vehicle Listings</h2>
        <ul>
          <li className='"sub-header'>
            Total Vehicles: <span className="number">50</span>
          </li>
          <li className='"sub-header'>
            Listing: <span className="number">10</span>
          </li>
          <li className='"sub-header'>
            On Hold: <span className="number">10</span>
          </li>
          <li className='"sub-header'>
            In Transit: <span className="number">15</span>
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
  );
};

export default Dashboard;
