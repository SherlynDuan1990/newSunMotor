//jshint esversion:6

const express = require('express');

const app = express();
const cookieParser= require ("cookie-parser")
const bodyParser =require ("body-parser")
const cloudinary=require ("cloudinary")

const errorMiddleware=require("./middlewares/errors")


app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())

// set up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET

})

const cors = require('cors'); 

const corsOrigin ={
    origin:
      "http://localhost:3000",
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOrigin));

//import all routes
const cars= require ("./routes/cars");
const user= require ("./routes/user");
const enquiries= require ("./routes/enquiry");
const customers= require ("./routes/customers");


app.use("/api/v1", cars)
app.use("/api/v1", user)
app.use("/api/v1", enquiries)
app.use("/api/v1", customers)


//middleware to handle errors
app.use(errorMiddleware);

module.exports=app