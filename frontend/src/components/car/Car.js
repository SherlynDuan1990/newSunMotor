import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';



const Car = ({ car }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <div className="col-sm-12 col-md-6 col-lg-4 my-3">
      <div className="card p-3 rounded">
        <div className="image-container">
          <img className="card-img-top mx-auto" src={car.images[0].url} />
        </div>
        <div className="card-body">
          <div className="card-info">
            <h5 className="card-title">
              <Link to={`/car/${car._id}`} style={{ fontSize: '22px' }}>
                {car.title}
              </Link>
              <p className="card-text">${car.price}</p>
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
                <Link
                  to={`/car/${car._id}/change-status`}
                  className="btn"
                  style={{
                    backgroundColor: '#685921',
                    fontSize: '16px',
                    color: 'white',
                  }}
                >
                  Change Status
                </Link>
              </div>
            ) : (
              <Link
                to={`/car/${car._id}`}
                className="btn"
                id="view_btn"
              >
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
