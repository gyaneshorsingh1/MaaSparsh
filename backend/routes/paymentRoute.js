const express = require("express");
const { processPayment, paymentVerification, razorpayWebhook } = require("../controllers/paymentController");
const { isAuthenticatedUser } = require("../middleware/auth")
const router = express.Router();

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/payment/verification").post(isAuthenticatedUser, paymentVerification);
// ✅ Add Webhook Route (No Authentication Required)
router.route("/payment/webhook").post(razorpayWebhook);

module.exports = router;
