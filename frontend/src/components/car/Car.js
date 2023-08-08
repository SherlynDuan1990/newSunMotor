import React from 'react'
import {Link } from "react-router-dom"

const Car = ({car}) => {
  return (
    <div  className="col-sm-12 col-md-6 col-lg-4 my-3">
                          <div className="card p-3 rounded">
                             <div className="image-container">
                                 <img
                                 className="card-img-top mx-auto"
                                 src={car.images[0].url}
                                 />
                             </div>
                              <div className="card-body d-flex flex-column">
                                <div className="card-info">
                                    <h5 className="card-title">
                                        <Link to={`/cars/${car._id} `} style={{ fontSize: '22px' }} >{car.title}</Link>
                                        <p className="card-text">${car.price}</p>
                                        <Link to={`/cars/${car._id} `} className="btn btn-block" id="view_btn" >View Details</Link>
                                    </h5>
                                    <div className="card-details">
                                        
                                        <span style={{ color:"#de9f18", fontSize: '16px' }} >{car.year}</span>
                                        <span style={{ fontSize: '12px', marginLeft:"0px" }} >{car.kilometers}km</span>
                                        <span style={{ fontSize: '12px', marginLeft:"0px" }} >{car.transmission}</span>
                                        <span style={{ fontSize: '12px', marginLeft:"0px" }} >{car.body}</span>
                                    </div>
                                </div>
                                
                              </div>
                          </div>
                        </div> 
  )
}

export default Car