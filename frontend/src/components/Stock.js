import React, { Fragment, useEffect } from 'react';
import Metadata from './layout/Metadata';
import Loader from './layout/Loader';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getCars, clearErrors } from '../actions/carActions';
import Car from './car/Car';

const Stock = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, cars, error, carCount } = useSelector((state) => state.cars);

  useEffect(() => {
    if (error) {
      return alert.error(error); 
    
    }

    dispatch(getCars());
  }, [dispatch, alert, error]); // Moved 'error' after 'dispatch'

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={'Quality used cars'} />
          <section id="cars" className="container mt-5">
            <div className="row">
              {cars &&
                cars.map((car) => <Car key={car._id} car={car} />)}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Stock;
