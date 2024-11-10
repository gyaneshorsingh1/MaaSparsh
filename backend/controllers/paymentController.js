const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/paymentModel");
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// Payment Processing - Create Order
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const { amount, cartItems, shippingInfo, userId, subtotal, shippingCharges, } = req.body;

  // Create Razorpay order with detailed notes
  const order = await instance.orders.create({
    amount: amount * 100, // Convert to paise for Razorpay
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
    notes: {
      orderItems: JSON.stringify(cartItems), // Convert objects to strings for notes
      shippingInfo: JSON.stringify(shippingInfo),
      userId,
      itemsPrice: subtotal,
      shippingPrice: shippingCharges,
      totalPrice: amount, // Convert to INR
      
    },
  });

  res.status(200).json({
    success: true,
    orderId: order.id,
    amount,
  });
});



// Payment Verification and Save to Database
exports.paymentVerification = async (req, res, next) => {
  // Log the incoming request to check the data
  console.log("Received Payment Data:", req.body);

  const { paymentId, orderId, signature, shippingInfo, orderItems, userId, itemsPrice, shippingPrice, totalPrice } = req.body;

  try {
    // Verify the payment signature using Razorpay's utility method
    const isValid = razorpay.utility.verifyPaymentSignature({
      order_id: orderId,
      payment_id: paymentId,
      signature: signature,
    });

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Payment signature verification failed!',
      });
    }

    // Fetch payment details from Razorpay API using the payment_id
    const paymentDetails = await razorpay.payments.fetch(paymentId);

    // Log the payment details to check the payment status
    console.log("Payment Details from Razorpay:", paymentDetails);

    // Get payment status (captured, failed, pending)
    const paymentStatus = paymentDetails.status; // This can be 'captured', 'failed', or 'pending'

    // Create the order based on the payment status
    const paymentInfo = {
      id: paymentId,
      status: paymentStatus,  // Set the payment status here
    };

    if (paymentStatus === 'captured') {
      // Payment was successful, now create the order in the database
      const newOrder = await Order.create(req.body);

      return res.status(200).json({
        success: true,
        message: 'Payment verified and order created successfully',
        order: newOrder,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Payment failed or is pending',
      });
    }
  } catch (error) {
    // Handle any errors that occur during the verification or order creation process
    console.error("Error verifying payment:", error);
    return next(error);
  }
};
  
