import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import {axios} from "../../request";
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../ConfirmationModal';

const apiUrl = process.env.REACT_APP_API_BASE_URL; 
const Car = ({ car }) => {
  const alert = useAlert();
  const navigate = useNavigate(); 
  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
  const [showStatusOptions, setShowStatusOptions] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  

  const handleStatusChange = async (status) => {
    try {
      await axios.put(` ${apiUrl}/api/v1/car/${car._id}/status`, { status });
      alert.success('Car status updated successfully');
      setShowStatusOptions(false);
      setSelectedStatus('');
      window.location.reload();
    } catch (error) {
      console.error('Error updating car status:', error);
      alert.error('An error occurred while updating car status');
    }
  };

  const handleDeleteCar = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(` ${apiUrl}/api/v1/admin/car/${car._id}`);
      alert.success('Car deleted successfully');
      setIsDeleteModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting car:', error);
      alert.error('An error occurred while deleting the car');
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };




  return  (
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
              {userFromLocalStorage && (
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
            {userFromLocalStorage ? (
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
                
                  className="btn mr-1"
                  style={{
                    backgroundColor: '#4E7299',
                    fontSize: '16px',
                    color: 'white',
                  }}
                  onClick={handleDeleteCar}
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
                    onClick={() => handleStatusChange('in transit')}
                  >
                    In Transit
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
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Confirm Delete"
        message="Do you really want to delete this vehicle?"
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  )
}

export default Car;
