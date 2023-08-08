import axios from "axios";
import {
    ALL_CARS_REQUEST, 
    ALL_CARS_SUCCESS,
    ALL_CARS_FAIL,
    CLEAR_ERRORS

} from "../constants/carConstants"

export const getCars=()=> async (dispatch)=>{
    try{
        dispatch({type:ALL_CARS_REQUEST})
        const {data} = await axios.get("/api/v1/cars")

        dispatch({
            type: ALL_CARS_SUCCESS,
            payload: data
        })


    }

     catch (error){
        console.log(error)
        dispatch({
            type: ALL_CARS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}


//CLEAR ERRORS
export const clearErrors=() => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })

}



