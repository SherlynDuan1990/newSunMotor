const express=require("express")
const router=express.Router()

const {getCars, newCar} = require ("../controllers/carController")

router.route("/cars").get(getCars);
router.route("/car/new").post(newCar);

module.exports=router;