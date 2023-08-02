const express=require("express")
const router=express.Router()

const {
    getCars, 
    newCar, 
    getSingleCar,
    updateCar,
    deleteCar} = require ("../controllers/carController")

router.route("/cars").get(getCars);


router.route("/car/:id").get(getSingleCar);

router.route("/admin/car/new").post(newCar);

router.route("/admin/car/:id")
                            .put(updateCar)
                            .delete(deleteCar);

module.exports=router;