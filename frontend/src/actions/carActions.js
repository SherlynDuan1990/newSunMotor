
import {axios} from "../request";
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
    UPDATE_CAR_REQUEST,
    UPDATE_CAR_SUCCESS,
    UPDATE_CAR_FAIL,
    UPDATE_CAR_RESET,
    GET_LISTING_VEHICLES_REQUEST,
    GET_LISTING_VEHICLES_SUCCESS,
    GET_LISTING_VEHICLES_FAILURE,
    CLEAR_ERRORS

} from "../constants/carConstants"

const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const getCars = (keyword = "", currentPage = 1, yearRange, priceRange, kilometersRange) => async (dispatch) => {
    
    try {
        dispatch({ type: ALL_CARS_REQUEST });

        let url = ` ${apiUrl}/api/v1/cars/?page=${currentPage}`;

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

        let url = `${apiUrl}/api/v1/admin/cars/?page=${currentPage}`;

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
        const {data} = await axios.get(` ${apiUrl}/api/v1/car/${id}`)


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
        

        const { data } = await axios.post(` ${apiUrl}/api/v1/car/${id}/testdrive`, bookingData);

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

    
    const response = await axios.post(`${apiUrl}/api/v1/admin/car/new`, carData);

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

export const updateCar =(carData, id) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CAR_REQUEST });
    
        
        const response = await axios.put(` ${apiUrl}/api/v1/admin/car/${id}`, carData);

        
    
        if (response.data.success) {
          dispatch({
            type: UPDATE_CAR_SUCCESS,
            payload: response.data.updatedCar,
          });
        } else {
          dispatch({
            type: UPDATE_CAR_FAIL,
            payload: 'Failed to update a car',
          });
        }
      } catch (error) {
        dispatch({
          type: ADD_NEW_CAR_FAIL,
          payload:
            error.response.data.errMessage || 'An error occurred while updating the car',
        });
      }
}

export const getListingVehicles = () => async (dispatch) => {
    try {
      dispatch({ type: GET_LISTING_VEHICLES_REQUEST });
  
      // Make an API request to fetch listing vehicles
      // Replace 'fetchListingVehicles' with your actual API call
      const response = await axios.get(`${apiUrl}/api/v1/car/dashboard/listingVehicles`);
      const data = response.data;
  
  
      dispatch({
        type: GET_LISTING_VEHICLES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LISTING_VEHICLES_FAILURE,
        payload: error.message,
      });
    }
  };

//CLEAR ERRORS
export const clearErrors=() => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })

}



