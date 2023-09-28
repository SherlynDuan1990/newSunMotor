import {
    ADD_CONTRACT_REQUEST,
    ADD_CONTRACT_SUCCESS,
    ADD_CONTRACT_FAILURE,
    CLEAR_ERRORS

} from "../constants/contractConstants"


export const contractReducer = (state = {newContract:[]}, action) => {
    switch (action.type) {
      case ADD_CONTRACT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case ADD_CONTRACT_SUCCESS:
        return {
          ...state,
          loading: false,
          newContract: action.payload,
          error: null,
        };
      case ADD_CONTRACT_FAILURE:
        return {
          ...state,
          isLoading: false,
          newContract: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  