// contactUsActions.js
import axios from 'axios';
import {
    CONTACT_US_REQUEST,
    CONTACT_US_SUCCESS,
    CONTACT_US_FAIL,
    CLEAR_ERRORS
} from '../constants/contactUsConstants';


const URL=process.env.REACT_APP_SERVER_URL

export const contactUs = (customerInfo) => async (dispatch) => {
    try {
        dispatch({ type: CONTACT_US_REQUEST });
        


        const { data } = await axios.post(`${URL}/api/v1/enquiries`, customerInfo);
        

        dispatch({
            type: CONTACT_US_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: CONTACT_US_FAIL,
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
