const express = require("express");
const router = express.Router();
const { createEnquiry } = require("../controllers/enquiryController");

router.route("/enquiries").post(createEnquiry);

module.exports = router;