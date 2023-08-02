//jshint esversion:6

const express = require('express');

const app = express();

const errorMiddleware=require("./middlewares/errors")

app.use(express.json())

//import all routes
const cars= require ("./routes/cars");

app.use("/api/v1", cars)

//middleware to handle errors
app.use(errorMiddleware);

module.exports=app