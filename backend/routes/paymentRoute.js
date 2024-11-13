const express = require("express");
const { processPayment, paymentVerification } = require("../controllers/paymentController");
const { isAuthenticatedUser } = require("../middleware/auth")
const router = express.Router();

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/payment/verification").post(isAuthenticatedUser, paymentVerification);

module.exports = router;