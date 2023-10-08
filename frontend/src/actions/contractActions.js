import axios from "axios";
import {
    ADD_CONTRACT_REQUEST,
    ADD_CONTRACT_SUCCESS,
    ADD_CONTRACT_FAILURE,
    CLEAR_ERRORS

} from "../constants/contractConstants"

const apiUrl = process.env.REACT_APP_API_BASE_URL; 

export const addContract = (contractData) => async (dispatch) => {
    dispatch({ type: ADD_CONTRACT_REQUEST });
  
    try {
      const {data} = await axios.post(`${apiUrl}/api/v1/admin/contract`, contractData)
    

  
      dispatch({
        type: ADD_CONTRACT_SUCCESS,
        payload: data.customer,
      });
    } catch (error) {
      dispatch({
        type: ADD_CONTRACT_FAILURE,
        payload: error.response.data.errMessage
      });
    }
  };

  //CLEAR ERRORS
export const clearErrors=() => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })

}