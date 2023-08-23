// authReducers.js
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
  } from '../constants/userConstants';
  
  
  export const authReducer = (state = {user:{}}, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return {
          loading: true,
          isAuthenticated: false
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          user: action.payload,
          loading: false,
          isAuthenticated: true
        };
      case LOGIN_FAIL:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          error: action.payload,
          user:null, 
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  
  