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
    getListingVehicles,
    getSoldVehicles,
} = require ("../controllers/carController")





const {isAuthenticatedUser, authorizeRoles}= require ("../middlewares/auth")


router.route("/cars").get(getCars);

router.route("/admin/cars").get(isAuthenticatedUser, getAdminCars);


router.route("/car/:id").get(getSingleCar);

router.route("/car/:id/testdrive").post(bookTestdrive);

router.route("/admin/car/new").post(isAuthenticatedUser, newCar); 

router.route("/admin/car/:id")
                            .put( isAuthenticatedUser, updateCar) 
                            .delete(isAuthenticatedUser,  deleteCar) 
router.route("/car/:id/status").put( isAuthenticatedUser, updateCarStatus);  

router.route("/car/dashboard/listingVehicles").get(isAuthenticatedUser, getListingVehicles); 

router.route("/car/dashboard/soldVehicles").post( isAuthenticatedUser, getSoldVehicles); 



module.exports=router;