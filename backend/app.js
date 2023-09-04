//jshint esversion:6

const express = require('express');

const app = express();
const cookieParser= require ("cookie-parser")
const errorMiddleware=require("./middlewares/errors")

app.use(express.json())

app.use(cookieParser())

const cors = require('cors'); 

const corsOrigin ={
    origin:
      "https://newsunmotor.onrender.com",
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOrigin));

//import all routes
const cars= require ("./routes/cars");
const user= require ("./routes/user");
const enquiries= require ("./routes/enquiry");


app.use("/api/v1", cars)
app.use("/api/v1", user)
app.use("/api/v1", enquiries)


//middleware to handle errors
app.use(errorMiddleware);

module.exports=app