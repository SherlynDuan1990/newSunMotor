const Car= require ("../models/cars")
//create a new car
exports.newCar = async (req, res, next)=>{
    const car =  await Car.create(req.body);
    res.status(201).json({
        success:true,
        car
    })
},


//get all cars
exports.getCars= (req, res, next)=>{

    res.status(200).json({
        success:true,
        message: "all cars"
    })
}