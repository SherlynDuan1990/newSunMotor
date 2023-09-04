import { Carousel } from 'react-bootstrap';
import React, { Fragment, useEffect } from 'react';
import Metadata from './layout/Metadata';
import Loader from './layout/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAboutUs, clearErrors } from '../actions/aboutUsActions';

const AboutUs = () => {
  const dispatch = useDispatch();
  const { loading, error, philosophy } = useSelector(state => state.philosophy);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(fetchAboutUs());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={'Quality used cars'} />
          <div className="about-us-container">
            <div className="carousel-container">
              {philosophy.length > 0 && (
                <Carousel>
                  {philosophy[0].images.map((image) => (
                    <Carousel.Item key={image.public_id}>
                      <img
                        src={image.url}
                        alt="Carousel Item"
                        className="carousel-image"
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
            </div>
            <div className="strand-container">
            {philosophy.length > 0 && (
              <>
                {philosophy[0].strands.map((strand, index) => (
                  <div key={index} >
                    <h2 style={{color: "#438a38",marginBottom:"10PX"}}>{strand.title}</h2>
                    <p>{strand.description}</p>
                  </div>
                ))}
              </>
            )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AboutUs;
