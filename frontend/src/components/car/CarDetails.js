import React, { Fragment, useEffect } from 'react';
import Metadata from '../layout/Metadata';
import Loader from '../layout/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getCarDetails, clearErrors } from '../../actions/carActions';
import { useAlert } from 'react-alert';
import { useParams, Link, useNavigate} from 'react-router-dom';



const CarDetails = () => {
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

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : car ? (
        <Fragment>
          <Metadata title={'Quality Used Car online'} />
          
          {/* Back button */}
          <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
            Back
          </button>

          <div className="d-flex flex-column align-items-center">
            <div  className="col-12 img-container d-flex justify-content-center">
              {car.images && car.images.length > 0 && (
                <img
                  src={car.images[0].url}
                  alt={car.title}
                 
                />
              )}
            </div>

            {/* Book a testdrive button */}
            <Link
            to={`/car/${car._id}/testdrive`}
            className="btn btn-block"
            id="book_btn"
            >
            Book a Testdrive
            </Link>

            <div className="col-12 mt-5">
              <div className="row">
                <div className="col-6">
                  <h3>{car.title}</h3>
                </div>
                <div className="col-6 text-right">
                  <p id="product_price" >${car.price}</p>
                </div>
              </div>

              <hr />

              <div className="row">
                <div className="col-6">
                  <p id="product_id">Car #{car._id}</p>
                </div>
                <div className="col-6 text-right">
                  <p>Status: <span id="stock_status">{car.status}</span></p>
                </div>
              </div>

              <hr />

              {/* Details section */}
              <div className="row">
                <div className="col-6">
                  <p>Stock No: {car.stockNo}</p>
                  <p>Doors: {car.doors}</p>
                  <p>Transmission: {car.transmission}</p>
                  <p>Registration: {car.regoExpire}</p>
                  <p>Kilometers: {car.kilometers}</p>
                  <p>Number of Seats: {car.seats}</p>
                  <p>Make: {car.make}</p>
                </div>
                <div className="col-6 text-right">
                  <p>Body Style: {car.body}</p>
                  <p>WOF: {car.wofExpire}</p>
                  <p>Fuel Type: {car.fuelType}</p>
                  <p>Engine: {car.engineSize}</p>
                  <p>Color: {car.color}</p>
                  <p>Number of Owners: {car.numberOfOwners}</p>
                  <p>Cylinders: {car.cylinders}</p>
                </div>
              </div>

              <hr />

              {/* Features section */}
              <div className="row align-items-center">
                <div className="col-12">
                  <h4>Features:</h4>
                  <div className="row">
                    <div className="col-md-4">
                        <ul>
                        {car.features &&
                            car.features
                            .slice(0, Math.ceil(car.features.length / 3))
                            .map((feature, index) => (
                                <li key={index}>
                                <i className="fa fa-check text-success"></i> {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <ul>
                        {car.features &&
                            car.features
                            .slice(
                                Math.ceil(car.features.length / 3),
                                Math.ceil((2 * car.features.length) / 3)
                            )
                            .map((feature, index) => (
                                <li key={index}>
                                <i className="fa fa-check text-success"></i> {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <ul>
                        {car.features &&
                            car.features
                            .slice(Math.ceil((2 * car.features.length) / 3))
                            .map((feature, index) => (
                                <li key={index}>
                                <i className="fa fa-check text-success"></i> {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                </div>
              </div>
              <hr />

              {/* Description section */}
              <h4 className="mt-2">Description:</h4>
              <p>{car.description}</p>
              <hr />

            
            </div>
          </div>
        </Fragment>
      ) : (
        <div>No car data available</div>
      )}
    </Fragment>
  );
};

export default CarDetails;
