// aboutUsReducers.js

import {
    FETCH_ABOUT_US_REQUEST,
    FETCH_ABOUT_US_SUCCESS,
    FETCH_ABOUT_US_FAIL,
    CLEAR_ERRORS,
  } from "../constants/aboutUsConstants";
  
  const initialState = {
    philosophy: [],
    loading: false,
    error: null,
  };
  
export const aboutUsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ABOUT_US_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_ABOUT_US_SUCCESS:
        return {
          philosophy: action.payload,
          loading: false,
          error: null,
        };
      case FETCH_ABOUT_US_FAIL:
        return {
          loading: false,
          error: action.payload,
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

  