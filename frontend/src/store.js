import { legacy_createStore as createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"


import { newCarReducers, 
    carReducers, 
    carDetailsReducers, 
    testDriveReducer, 
    listingVehiclesReducer} from "./reducers/carReducers"
import {contactUsReducers} from "./reducers/contactUsReducers"
import {aboutUsReducer} from "./reducers/aboutUsReducers"
import {authReducer} from "./reducers/userReducers"
import {contractReducer} from "./reducers/contractReducers"

const reducer=combineReducers({
    cars: carReducers,
    newCar: newCarReducers,
    carDetails: carDetailsReducers,
    testDrive: testDriveReducer,
    contactUs: contactUsReducers,
    philosophy: aboutUsReducer,
    auth: authReducer,
    listingVehicles:listingVehiclesReducer,
    newContract:contractReducer,

})
let initialState ={}

const middleware=[thunk]


const store=createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;