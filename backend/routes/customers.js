const express=require("express")
const router=express.Router()

const {
    newCustomer,
    getAllCustomers
} = require ("../controllers/customerController")


router.route("/admin/customers").get(getAllCustomers)
router.route("/admin/customers/add").post(newCustomer)   

module.exports = router;