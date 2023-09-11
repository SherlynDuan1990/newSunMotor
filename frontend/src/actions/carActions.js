import axios from "axios";
import {
    ALL_CARS_REQUEST, 
    ALL_CARS_SUCCESS,
    ALL_CARS_FAIL,
    CARS_DETAILS_REQUEST,
    CARS_DETAILS_SUCCESS,
    CARS_DETAILS_FAIL,
    BOOK_TEST_DRIVE_REQUEST,
    BOOK_TEST_DRIVE_SUCCESS,
    BOOK_TEST_DRIVE_FAIL,
    ADD_NEW_CAR_REQUEST,
    ADD_NEW_CAR_SUCCESS,
    ADD_NEW_CAR_FAIL,
    CLEAR_ERRORS

} from "../constants/carConstants"

export const getCars = (keyword = "", currentPage = 1, yearRange, priceRange, kilometersRange) => async (dispatch) => {
    
    try {
        dispatch({ type: ALL_CARS_REQUEST });

        let url = `/api/v1/cars/?page=${currentPage}`;

        if (keyword) {
            url += `&keyword=${keyword}`;
        }

        if (yearRange && yearRange.length === 2) {
            url += `&year[gte]=${yearRange[0]}&year[lte]=${yearRange[1]}`;
        }

        if (priceRange && priceRange.length === 2) {
            url += `&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}`;
        }

        if (kilometersRange && kilometersRange.length === 2) {
            url += `&kilometers[gte]=${kilometersRange[0]}&kilometers[lte]=${kilometersRange[1]}`;
        }

        const { data } = await axios.get(url);

       
        dispatch({
            type: ALL_CARS_SUCCESS,
            payload: data
        })


    }

     catch (error){
        dispatch({
            type: ALL_CARS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const getAdminCars = (keyword = "", currentPage = 1, yearRange, priceRange, kilometersRange) => async (dispatch) => {
    
    try {
        dispatch({ type: ALL_CARS_REQUEST });

        let url = `/api/v1/admin/cars/?page=${currentPage}`;

        if (keyword) {
            url += `&keyword=${keyword}`;
        }

        if (yearRange && yearRange.length === 2) {
            url += `&year[gte]=${yearRange[0]}&year[lte]=${yearRange[1]}`;
        }

        if (priceRange && priceRange.length === 2) {
            url += `&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}`;
        }

        if (kilometersRange && kilometersRange.length === 2) {
            url += `&kilometers[gte]=${kilometersRange[0]}&kilometers[lte]=${kilometersRange[1]}`;
        }

        const { data } = await axios.get(url);

        console.log(data)

       
        dispatch({
            type: ALL_CARS_SUCCESS,
            payload: data
        })


    }

     catch (error){
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



export const bookTestdrive = (id, bookingData) => async (dispatch) => {
    try {
        dispatch({ type: BOOK_TEST_DRIVE_REQUEST });
        

        const { data } = await axios.post(`/api/v1/car/${id}/testdrive`, bookingData);

        console.log(data)

        dispatch({
            type: BOOK_TEST_DRIVE_SUCCESS,
            payload: data.testDrive,
        });
    } catch (error) {
        dispatch({
            type: BOOK_TEST_DRIVE_FAIL,
            payload: error.response.data.errMessage,
        });
    }
};




export const addNewCar = (carData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_NEW_CAR_REQUEST });

    
    const response = await axios.post('http://127.0.0.1:4000/api/v1/admin/car/new', carData);

    if (response.data.success) {
      dispatch({
        type: ADD_NEW_CAR_SUCCESS,
        payload: response.data.newCar,
      });
    } else {
      dispatch({
        type: ADD_NEW_CAR_FAIL,
        payload: 'Failed to add a new car',
      });
    }
  } catch (error) {
    dispatch({
      type: ADD_NEW_CAR_FAIL,
      payload:
        error.response.data.errMessage || 'An error occurred while adding the car',
    });
  }
};



//CLEAR ERRORS
export const clearErrors=() => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })

}



