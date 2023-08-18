import React, { Fragment, useState, useEffect } from 'react';
import Metadata from './layout/Metadata';
import Loader from './layout/Loader';
import Pagination from "react-js-pagination"

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getCars, clearErrors } from '../actions/carActions';
import Car from './car/Car';
import {  useLocation} from 'react-router-dom'; 


const Stock = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, cars, error, carCount, resPerPage} = useSelector((state) => state.cars);

  const location = useLocation();
  const { keyword, yearRange, priceRange, kilometersRange } = location.state || {};
 

 

  useEffect(() => {
    if (error) {
      return alert.error(error); 
    
    }

    dispatch(getCars(keyword, currentPage, yearRange, priceRange, kilometersRange));
  }, [dispatch, alert, error, keyword, currentPage, yearRange, priceRange, kilometersRange]); // Moved 'error' after 'dispatch'

  function setCurrentPageNo(pageNumber){
    setCurrentPage(pageNumber)
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
              {cars &&
                cars.map((car) => <Car key={car._id} car={car} />)}
            </div>
          </section>
          
          {resPerPage< carCount  && (
            <div className='d-flex justify-content-center mt-5'>
            <Pagination
             activePage={currentPage}
             itemsCountPerPage={resPerPage}
             totalItemsCount={carCount}
             onChange={setCurrentPageNo}
             nextPageText= {"Next"} 
             prevPageText={"previous"}  
             firstPageText= {"First"} 
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
