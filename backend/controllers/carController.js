const Car= require ("../models/cars")
const ErrorHandler=require("../utils/errorHandler")



//get all cars  => /api/v1/cars
exports.getCars= async (req, res, next)=>{

    const cars= await Car.find()

    res.status(200).json({
        success:true,
        count: cars.length,
        cars
    })
},

//get a sigle car /api/v1/car/:id
exports.getSingleCar= async (req, res, next)=>{
    const car= await Car.findById(req.params.id);
    if (!car) {
        return next(new ErrorHandler("babysitter not found", 404))
    }
    res.status(200).json({
        success:true,
        car
    })
},

//create a new car => /api/v1/admin/car/new
exports.newCar = async (req, res, next)=>{
    const car =  await Car.create(req.body);
    res.status(201).json({
        success:true,
        car
    })
},

//update cars=> /api/v1/admin/car/:id
exports.updateCar= async (req, res, next)=>{
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

},

//delete cars=> /api/v1/admin/car/:id
exports.deleteCar= async (req, res, next)=>{
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

}
