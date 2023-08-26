const express=require("express")
const router=express.Router()

const {
    getCars, 
    newCar, 
    getSingleCar,
    updateCar,
    deleteCar,
    bookTestdrive} = require ("../controllers/carController")

const {isAuthenticatedUser, authorizeRoles}= require ("../middlewares/auth")

router.route("/cars").get(getCars);

router.route("/admin/cars").get(isAuthenticatedUser, authorizeRoles("admin"), getCars);


router.route("/car/:id").get(getSingleCar);

router.route("/car/:id/testdrive").post(bookTestdrive);

router.route("/admin/car/new").post(isAuthenticatedUser, authorizeRoles("admin"),newCar);

router.route("/admin/car/:id")
                            .put(isAuthenticatedUser, authorizeRoles("admin"), updateCar)
                            .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCar);

module.exports=router;