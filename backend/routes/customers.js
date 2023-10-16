const express=require("express")
const router=express.Router()

const {
    newCustomer,
    getAllCustomers,
    newContract
} = require ("../controllers/customerController")

const {isAuthenticatedUser, authorizeRoles}= require ("../middlewares/auth")

router.route("/admin/customers").get(isAuthenticatedUser,getAllCustomers)
router.route("/admin/customers/add").post(isAuthenticatedUser, newCustomer)   
router.route("/admin/contract").post( isAuthenticatedUser, newContract)

module.exports = router;