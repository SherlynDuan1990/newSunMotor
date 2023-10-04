const express=require("express")
const router=express.Router()

const {
    newCustomer,
    getAllCustomers,
    newContract
} = require ("../controllers/customerController")

const {isAuthenticatedUser, authorizeRoles}= require ("../middlewares/auth")

router.route("/admin/customers").get(getAllCustomers)
router.route("/admin/customers/add").post(isAuthenticatedUser, authorizeRoles("admin"),newCustomer)   
router.route("/admin/contract").post(isAuthenticatedUser, authorizeRoles("admin"), newContract)

module.exports = router;