const Car = require ("../models/cars");
const connectDatabase= require("../config/database");
const cars= require("../data/cars");

require('dotenv').config({path: 'backend/config/config.env'})

connectDatabase()

const seedCar = async()=> {
    try{
        await Car.deleteMany();
        console.log("Cars are deleted");

        await Car.insertMany(cars);
        console.log("all cars are added");
        process.exit()

    }catch (error) {
        console.log(error.message);
        process.exit()
    }
}

seedCar ()