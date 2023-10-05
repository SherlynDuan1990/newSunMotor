import React, { Fragment, useState, useEffect } from 'react';
import Metadata from './layout/Metadata';
import Loader from './layout/Loader';
import Pagination from "react-js-pagination";
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getCars, clearErrors } from '../actions/carActions';
import Car from './car/Car';
import { useLocation, useNavigate } from 'react-router-dom'; 

const Stock = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Get the navigate function
  const { user } = useSelector((state) => state.auth);
  const { loading, cars, error, carCount, resPerPage } = useSelector((state) => state.cars);

  const location = useLocation();
  const { keyword, yearRange, priceRange, kilometersRange } = location.state || {};

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getCars(keyword, currentPage, yearRange, priceRange, kilometersRange));
  }, [dispatch, alert, error, keyword, currentPage, yearRange, priceRange, kilometersRange]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={'Quality used cars'} />
          <section id="cars" className="container mt-5">
            <div className="row">
              {cars && cars.length > 0 ? (
                cars.map((car) => <Car key={car._id} car={car} />)
              ) : (
                // Display an alert and navigate back to the search page if no results
                <div className="alert alert-warning text-center" style={{ fontSize: "22px", backgroundColor:  "white", color:"Grey", borderStyle:"none" , width:"60%", margin:"20px auto"}}>
                  <p>Sorry, No Results Found.</p>
                  <button className="btn" style={{ backgroundColor: '#438A38', color: 'white' }} onClick={() => navigate('/')}>
                    Go Back to Search
                  </button>
                </div>

              )}
            </div>
          </section>

          {resPerPage < carCount && (
            <div className='d-flex justify-content-center mt-5'>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={carCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"previous"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass='page-link'
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Stock;
