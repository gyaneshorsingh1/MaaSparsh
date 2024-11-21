import React, { Fragment, useEffect } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
import "./Payment.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material"; // Updated import for Typography (Material UI v5)
import { toast } from "react-toastify";
import axios from "axios";

import { clearErrors, createOrder } from "../../actions/orderAction";
import axiosAPI from "../../actions/axiosInstance";
const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  // Fallback values for missing orderInfo properties
  const amount = orderInfo.totalPrice;
  const shippingCharges = orderInfo.shippingCharges;
  const subtotal = orderInfo.subtotal;
  const userId = user._id;
  console.log(shippingCharges);

  const checkoutHandler = async () => {
    try {
      const key = import.meta.env.RAZORPAY_KEY;
      console.log(key);
      // Process payment and get order details
      const { data } = await axiosAPI.post(
        "/api/v1/payment/process",
        {
          amount: orderInfo.totalPrice,
          cartItems,
          shippingCharges,
          shippingInfo,
          subtotal,
          userId,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const { orderId, amount } = data;

      // Razorpay options
      const options = {
        key: key,
        amount,
        currency: "INR",
        name: "Masparsh",
        description: "Payment Transaction",
        order_id: orderId,
        handler: async function (response) {
          if (
            response.razorpay_order_id &&
            response.razorpay_payment_id &&
            response.razorpay_signature
          ) {
            const order = {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              shippingInfo,
              orderItems: cartItems.map((item) => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
                product: item.product,
              })),
              user: userId,
              paymentInfo: {
                id: response.razorpay_payment_id,
                status: "Paid",
              },
              itemsPrice: subtotal,
              shippingPrice: shippingCharges,
              totalPrice: amount,
              orderStatus: "Proccessing",
              paidAt: new Date(),
            };
            const orderId = response.razorpay_order_id;

              // Send order data to backend to create a new order
              const paymentVerify = await axiosAPI.post("/api/v1/payment/verification", {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                shippingInfo,
                orderItems: cartItems,
                userId,
                itemsPrice: subtotal,
                shippingPrice: shippingCharges,
                totalPrice: amount,
              });
              
              await dispatch(createOrder(order));
              // Navigate to payment success page and show success message
              
              navigate(`/payment/successful/${orderId}`);
              alert.success("Payment successful and verified!");
            
          }
        },

        prefill: {
          name: user.name,
          email: user.email,
          contact: shippingInfo.phoneNo,
        },
        theme: {
          color: "tomato",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        toast.error(`Payment Failed: ${response.error.description}`);
      });
      rzp1.open();
    } catch (error) {
      console.error("Error in checkoutHandler:", error.message || error);
      toast.error(
        `Payment processing failed. ${error.response?.data?.message}`
      );
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title="Pay Now" />
      <CheckoutSteps activeStep={2} />
      <div className="PaymentPage">
        <div>
          <div className="PaymentCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="PaymentItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product} className="cart-detailss">
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span className="subTotal-payment">
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="PaymentOrderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
            </div>
            <div className="TotalPaymentSummary">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{amount}</span>
            </div>
            <button onClick={checkoutHandler}>Pay Now</button>
            {/* <button onClick={cashOnDeliveryHandler}>Cash on delivery</button> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
