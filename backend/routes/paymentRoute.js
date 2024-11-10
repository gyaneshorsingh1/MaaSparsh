const express = require("express");
const { processPayment, paymentVerification } = require("../controllers/paymentController");
const { isAuthenticatedUser } = require("../middleware/auth")
const router = express.Router();

router.route("/payment/process").post(processPayment, isAuthenticatedUser);
router.route("/payment/verification").post(paymentVerification, isAuthenticatedUser);

module.exports = router;