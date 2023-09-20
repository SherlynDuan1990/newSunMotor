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

export const carReducers =(state={cars:[]}, action)=>{
    switch (action.type){
        case  ALL_CARS_REQUEST:
            return {
                loading:true,
                cars:[]
            }

            case  ALL_CARS_SUCCESS:
                return {
                    loading:false,
                    cars:action.payload.cars,
                    carCount:action.payload.carCount,
                    resPerPage:action.payload.resPerPage
                }
            case  ALL_CARS_FAIL:
                return {
                    loading:false,
                    error:action.payload
                }
            case  CLEAR_ERRORS:
                return {
                    ...state,
                    error:null
                }

        default:
            return state;

    }
}

export const newCarReducers =(state={newCar:[]}, action)=>{
    switch (action.type){
        case ADD_NEW_CAR_REQUEST:
                return {
                    ...state,
                    loading: true,
                };
            
            case ADD_NEW_CAR_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true, 
                newCar: action.payload, 
            };
            
            case ADD_NEW_CAR_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
              
            case  CLEAR_ERRORS:
                return {
                    ...state,
                    error:null
                }

        default:
            return state;
    }
}

export const updateCarReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_CAR_REQUEST:
        return { loading: true };
      case UPDATE_CAR_SUCCESS:
        return { loading: false, success: true,  updatedCar: action.payload};
      case UPDATE_CAR_FAIL:
        return { loading: false, error: action.payload };
      case UPDATE_CAR_RESET:
        return {};
      default:
        return state;
    }
  };



export const carDetailsReducers =(state={car:[]}, action)=>{
    switch (action.type){
        case  CARS_DETAILS_REQUEST:
            return {
                ...state,
                loading:true,
                
            }

        case  CARS_DETAILS_SUCCESS:
            return {
                loading:false,
                car:action.payload
            }
        case  CARS_DETAILS_FAIL:
            return {
                ...state,
                error:action.payload
            }
        case  CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }

        default:
            return state;

    }
}



const initialState = {
    loading: false,
    success: false,
    error: null,
    testDrive: null,
};

export const testDriveReducer = (state = initialState, action) => {
    switch (action.type) {
        case BOOK_TEST_DRIVE_REQUEST:
            return { ...state, loading: true };

        case BOOK_TEST_DRIVE_SUCCESS:
            return { ...state, loading: false, success: true, testDrive: action.payload };

        case BOOK_TEST_DRIVE_FAIL:
            return { ...state, loading: false, error: action.payload };
            case  CLEAR_ERRORS:
        return {
            ...state,
            error:null
        }

        default:
            return state;
    }
};

export const listingVehiclesReducer = (state = { loading: false, listingVehicles: [], error: null }, action) => {
    switch (action.type) {
      case GET_LISTING_VEHICLES_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_LISTING_VEHICLES_SUCCESS:
        return {
          ...state,
          loading: false,
          listingVehicles: action.payload.data,
          error: null,
        };
      case GET_LISTING_VEHICLES_FAILURE:
        return {
          ...state,
          loading: false,
          listingVehicles: [], // Maintain it as an empty array on failure
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
