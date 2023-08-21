// contactUsReducers.js
import {
    CONTACT_US_REQUEST,
    CONTACT_US_SUCCESS,
    CONTACT_US_FAIL,
    CLEAR_ERRORS
} from '../constants/contactUsConstants';

export const contactUsReducers = (state = {}, action) => {
    switch (action.type) {
        case CONTACT_US_REQUEST:
            return { loading: true };
        case CONTACT_US_SUCCESS:
            return { loading: false, success: true, contactUs :action.payload};
        case CONTACT_US_FAIL:
            return { loading: false, error: action.payload };
            case  CLEAR_ERRORS:
                return {
                    ...state,
                    error:null
                }
        default:
            return state;
    }
};
