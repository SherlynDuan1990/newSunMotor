import React, {Fragment, useEffect} from 'react'
import Metadata from './layout/Metadata';
import Loader from "./layout/Loader"

import Car from "./car/Car";

import {useDispatch, useSelector} from "react-redux";
import { getCars } from '../actions/carActions';

const Stock = () => {

  const dispatch=useDispatch();
  const {loading, cars, error, carCount} = useSelector (state => state.cars)
  
  useEffect (()=>{

    dispatch(getCars());

      
  }, [dispatch])

  return (
    <Fragment>
      {loading ? <Loader/> : (
      <Fragment>
        <Metadata title={"Quality used cars"}/>
        <section id="cars" className="container mt-5">
          <div className='row'>
            {cars && cars.map(car=>(
                    <Car key={car._id} car={car} />          
                              
            ))} 
        
          </div>
        </section>
      </Fragment>
      )}
      
    </Fragment>)
      
   
  }    

    

  


export default Stock