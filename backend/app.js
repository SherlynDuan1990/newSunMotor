//jshint esversion:6

const express = require('express');

const app = express();

app.use(express.json())

//import all routes
const cars= require ("./routes/cars");

app.use("/api/v1", cars)

module.exports=app