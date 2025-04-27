
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/paymentModel");
const Order = require("../models/orderModel");
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});
// Payment Processing - Create Order
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const { amount, cartItems, shippingInfo, userId, name, subtotal, shippingCharges, } = req.body;

  // Create Razorpay order with detailed notes
  const order = await instance.orders.create({
    amount: amount * 100, // Convert to paise for Razorpay
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
    notes: {
      orderItems: JSON.stringify(cartItems), // Convert objects to strings for notes
      shippingInfo: JSON.stringify(shippingInfo),
      userId,
      name,
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

  // Destructure incoming data from the request body
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, name } = req.body;

   // Verify the payment signature using Razorpay's utility method
  const body = razorpay_order_id + "|" + razorpay_payment_id;

    // Use the correct Razorpay secret key from environment variables
  const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)  // Use the correct key variable here
      .update(body.toString())
      .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    const paymentDetails = await instance.payments.fetch(razorpay_payment_id);

    const notes = paymentDetails.notes;

      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        name:notes.name,
        
    });

    await Order.create({
      shippingInfo: JSON.parse(notes.shippingInfo),
      orderItems: JSON.parse(notes.orderItems),
      user: notes.userId,
      name: notes.name,
      paymentInfo: {
        id: razorpay_payment_id,
        status: paymentDetails.status,
      },
      itemsPrice: notes.itemsPrice,
      shippingPrice: notes.shippingPrice,
      totalPrice: notes.totalPrice,
      orderStatus: "Processing",
      paidAt: new Date(),
      razorpay_order_id: razorpay_order_id, // connect order to razorpay
    });

      // Respond with success message
    return res.redirect(`http://localhost:5173/order/success/${razorpay_order_id}`);

    } else {
      // Signature mismatch, return failure message
      return res.status(400).json({
        success: false,
        message: "Payment verification failed, Please try again",
      });
    }
};


// webhook
exports.razorpayWebhook = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET; // Set this in Razorpay Dashboard

  const shasum = crypto.createHmac("sha256", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (shasum !== req.headers["x-razorpay-signature"]) {
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }

  const event = req.body.event;
  if (event === "payment.captured") {
    const paymentEntity = req.body.payload.payment.entity;
    const { order_id, id: paymentId, notes } = paymentEntity;

    const paymentDetails = await instance.payments.fetch(paymentId);

    // Check if payment already recorded
    const existingPayment = await Payment.findOne({ razorpay_payment_id: paymentId });

    if (!existingPayment) {
      await Payment.create({
        razorpay_order_id: order_id,
        razorpay_payment_id: paymentId,
        razorpay_signature: "Webhook", // No signature in webhook
        name: notes.name,
      });

      await Order.create({
        shippingInfo: JSON.parse(notes.shippingInfo),
        orderItems: JSON.parse(notes.orderItems),
        user: notes.userId,
        name: notes.name,
        paymentInfo: {
          id: paymentId,
          status: paymentDetails.status,
        },
        itemsPrice: notes.itemsPrice,
        shippingPrice: notes.shippingPrice,
        totalPrice: notes.totalPrice,
        orderStatus: "Processing",
        paidAt: new Date(),
        razorpay_order_id: razorpay_order_id, // connect order to razorpay
      });
    }
  }

  res.status(200).json({ success: true, message: "Webhook processed" });
};


