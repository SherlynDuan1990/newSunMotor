//jshint esversion:6

const express = require('express');

const app = express();
const cookieParser= require ("cookie-parser")
const errorMiddleware=require("./middlewares/errors")

app.use(express.json())

app.use(cookieParser())

//import all routes
const cars= require ("./routes/cars");
const user= require ("./routes/user");

app.use("/api/v1", cars)
app.use("/api/v1", user)

//middleware to handle errors
app.use(errorMiddleware);

module.exports=app