import axios from "axios";
import {
    ALL_CARS_REQUEST, 
    ALL_CARS_SUCCESS,
    ALL_CARS_FAIL,
    CARS_DETAILS_REQUEST,
    CARS_DETAILS_SUCCESS,
    CARS_DETAILS_FAIL,
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

export const getCarDetails=(id)=> async (dispatch)=>{
    try{
        dispatch({type:CARS_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/v1/cars/${id}`)


        dispatch({
            type:CARS_DETAILS_SUCCESS,
            payload: data.car,
        })
    }

     catch (error){
       
        dispatch({
            type: CARS_DETAILS_FAIL,
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



