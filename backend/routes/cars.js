const express=require("express")
const router=express.Router()

const {
    getCars, 
    getAdminCars,
    newCar, 
    getSingleCar,
    updateCar,
    deleteCar,
    bookTestdrive,
    updateCarStatus,
} = require ("../controllers/carController")





const {isAuthenticatedUser, authorizeRoles}= require ("../middlewares/auth")


router.route("/cars").get(getCars);

router.route("/admin/cars").get(isAuthenticatedUser, authorizeRoles("admin"), getAdminCars);


router.route("/car/:id").get(getSingleCar);

router.route("/car/:id/testdrive").post(bookTestdrive);

router.route("/admin/car/new").post( newCar); //isAuthenticatedUser, authorizeRoles("admin"),


router.route("/admin/car/:id")
                            .put(updateCar) //isAuthenticatedUser, authorizeRoles("admin"),
                            .delete( deleteCar) //isAuthenticatedUser, authorizeRoles("admin"),
router.route("/car/:id/status").put( updateCarStatus);  //isAuthenticatedUser, authorizeRoles("admin"),
                      

module.exports=router;