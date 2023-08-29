import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import axios from 'axios'; 

const Car = ({ car }) => {
  const alert = useAlert();
  const { user } = useSelector((state) => state.auth);
  const [showStatusOptions, setShowStatusOptions] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleStatusChange = async (status) => {
    try {
      await axios.put(`/api/v1/car/${car._id}/status`, { status });
      alert.success('Car status updated successfully');
      setShowStatusOptions(false);
      setSelectedStatus('');
      window.location.reload();
    } catch (error) {
      console.error('Error updating car status:', error);
      alert.error('An error occurred while updating car status');
    }
  };

  return (
    <div className="col-sm-12 col-md-6 col-lg-4 my-3">
      <div className="card p-3 rounded">
        <div className="image-container">
          <img className="card-img-top mx-auto" src={car.images[0].url} alt={car.title} />
        </div>
        <div className="card-body">
          <div className="card-info">
            <h5 className="card-title">
              <Link to={`/car/${car._id}`} style={{ fontSize: '22px' }}>
                {car.title}
              </Link>
              <p className="card-text">${car.price}</p>
              {user && (
              <p className="card-text" style={{ fontSize: '18px' , color: "black"}}>{car.status}</p>

              )}
            </h5>
            <div className="card-details">
              <span style={{ color: '#de9f18', fontSize: '16px' }}>
                {car.year}
              </span>
              <span style={{ fontSize: '12px', marginLeft: '0px' }}>
                {car.kilometers}km
              </span>
              <span style={{ fontSize: '12px', marginLeft: '0px' }}>
                {car.transmission}
              </span>
              <span style={{ fontSize: '12px', marginLeft: '0px' }}>
                {car.body}
              </span>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
            {user ? (
              <div className="btn-group">
                <Link
                  to={`/car/${car._id}/update`}
                  className="btn mr-1"
                  style={{
                    backgroundColor: '#438A38',
                    fontSize: '16px',
                    color: 'white',
                  }}
                >
                  Update
                </Link>
                <Link
                  to={`/car/${car._id}/delete`}
                  className="btn mr-1"
                  style={{
                    backgroundColor: '#4E7299',
                    fontSize: '16px',
                    color: 'white',
                  }}
                >
                  Delete
                </Link>
                <button
                className="btn status-btn"
                onClick={() => setShowStatusOptions(!showStatusOptions)}
              >
                Status
              </button>
              {showStatusOptions && (
                <div className="status-options">
                  <button
                    className="btn status-option"
                    onClick={() => handleStatusChange('listing')}
                  >
                    Listing
                  </button>
                  <button
                    className="btn status-option"
                    onClick={() => handleStatusChange('on hold')}
                  >
                    On Hold
                  </button>
                  <button
                    className="btn status-option"
                    onClick={() => handleStatusChange('sold')}
                  >
                    Sold
                  </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to={`/car/${car._id}`} className="btn" id="view_btn">
                View Details
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Car;
