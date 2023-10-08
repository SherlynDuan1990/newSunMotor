import axios from 'axios';
import {
  FETCH_ABOUT_US_REQUEST,
  FETCH_ABOUT_US_SUCCESS,
  FETCH_ABOUT_US_FAIL,
  CLEAR_ERRORS,
} from "../constants/aboutUsConstants";

const apiUrl = process.env.REACT_APP_API_BASE_URL; 

// Fetch About Us data
export const fetchAboutUs = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ABOUT_US_REQUEST });

    const {data} = await axios.get(`${apiUrl}/api/v1/aboutUs`); 
  


    dispatch({
      type: FETCH_ABOUT_US_SUCCESS,
      payload: data.philosophy,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ABOUT_US_FAIL,
      payload:  error.response.data.errMessage
    });
  }
};

//CLEAR ERRORS
export const clearErrors=() => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })

}