import {
    ALL_CARS_REQUEST, 
    ALL_CARS_SUCCESS,
    ALL_CARS_FAIL,
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
                    carCount:action.payload.carCount
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


