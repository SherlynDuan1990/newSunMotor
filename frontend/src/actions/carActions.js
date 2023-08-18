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

export const getCars=(keyword=" ", currentPage=1, yearRange, priceRange, kilometersRange)=> async (dispatch)=>{
        console.log(keyword)
        console.log(yearRange)
        console.log(priceRange)
        console.log(kilometersRange)
    try{
        dispatch({type:ALL_CARS_REQUEST})
        
        console.log (`/api/v1/cars/?keyword=${keyword}&page=${currentPage}&year[gte]=${yearRange[0]}&year[lte]=${yearRange[1]}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}&kilometers[gte]=${kilometersRange[0]}&kilometers[lte]${kilometersRange[1]}`)
        const { data } = await axios.get(
            `/api/v1/cars/?keyword=${keyword}&page=${currentPage}&year[gte]=${yearRange[0]}&year[lte]=${yearRange[1]}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}&kilometers[gte]=${kilometersRange[0]}&kilometers[lte]=${kilometersRange[1]}`
          );

       
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
        const {data} = await axios.get(`/api/v1/car/${id}`)


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



