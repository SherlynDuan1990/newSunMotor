// authActions.js
import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  LOGOUT_REQUEST, 
  LOGOUT_SUCCESS, 
  LOGOUT_FAIL 
} from '../constants/userConstants';



const URL=process.env.REACT_APP_SERVER_URL



// Login action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(`${URL}/api/v1/login`, { email, password }, config, { withCredentials: true });
  
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
    localStorage.setItem('user', JSON.stringify(data.user));
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.errMessage,
    });
  }
};

//logout

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });

    const { data } = await axios.get(`${URL}/api/v1/logout`, { withCredentials: true });

    dispatch({ type: LOGOUT_SUCCESS });
    localStorage.removeItem('user');
    window.location.reload();
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.errMessage
    })
  }

};


// Clear errors action
export const clearErrors = () => async(dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
