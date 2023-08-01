const Car= require ("../models/cars")



//get all cars
exports.getCars= (req, res, next)=>{

    res.status(200).json({
        success:true,
        message: "all cars"
    })
}