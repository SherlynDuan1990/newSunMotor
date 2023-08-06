const Car= require ("../models/cars")
const ErrorHandler=require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const APIFeatures=require("../utils/APIFeatures")



//get all cars  => /api/v1/cars
exports.getCars= catchAsyncErrors (async (req, res, next)=>{
    const resPerPage = 6; 
    const carCount = await Car.countDocuments();
    

    const apiFeatures= new APIFeatures(Car.find(), req.query)
                        .search()
                        .filter()
                        .pagination(resPerPage)
    const cars= await apiFeatures.query

    res.status(200).json({
        success:true,
        count: cars.length,
        carCount,
        cars
    })
}),

//get a sigle car /api/v1/car/:id
exports.getSingleCar= catchAsyncErrors (async (req, res, next)=>{
    const car= await Car.findById(req.params.id);
    if (!car) {
        return next(new ErrorHandler("car not found", 404))
    }
    res.status(200).json({
        success:true,
        car
    })
}),

// add a test drive booking to a car  /api/v1/car/:id/testdrive
exports.bookTestdrive= catchAsyncErrors (async (req, res) => {
    const car= await Car.findById(req.params.id);
    
    const {
    date,
    time,
    email,
    fullName,
    phoneNumber,
    dateOfBirth,
    drivingLicense,
    } = req.body;


    if (!car) {
        return next(new ErrorHandler("car not found", 404))
    }

    // Create a new test drive booking
    const testDrive = {
    date,
    time,
    customer: {
        email,
        fullName,
        phoneNumber,
        dateOfBirth,
        drivingLicense,
    },
    };
  
    // Add the test drive booking to the car's testdrives array
    car.testdrives.push(testDrive);
  
      // Save the updated car document
      await car.save();
  
      return res.status(201).json({ success: true, message: 'Test drive booked successfully' } )
}),

//create a new car => /api/v1/admin/car/new
exports.newCar =catchAsyncErrors ( async (req, res, next)=>{
    
    
    const car =  await Car.create(req.body);
    res.status(201).json({
        success:true,
        car
    })
}),

//update cars=> /api/v1/admin/car/:id
exports.updateCar= catchAsyncErrors (async (req, res, next)=>{
    let car= await Car.findById(req.params.id);
    if (!car) {
        return res.status(404).json({
                success:false,
                message: "car not found" })
    }

    car= await Car.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        car
    })

}),

//delete cars=> /api/v1/admin/car/:id
exports.deleteCar= catchAsyncErrors (async (req, res, next)=>{
    let car= await Car.findById(req.params.id);
    if (!car) {
        return res.status(404).json({
            success:false,
            message: "car not found" })
}

    await car.deleteOne();

    res.status(200).json({
        success:true,
        message:"car is deleted"
    })

})
