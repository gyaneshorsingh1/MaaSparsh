import React, { Fragment, useEffect, useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
import "./Payment.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material"; // Updated import for Typography (Material UI v5)
import { toast } from "react-toastify";

import {
  clearErrors,
  createCodOrder,
  createOrder,
} from "../../actions/orderAction";
import axiosAPI from "../../actions/axiosInstance";
const Payment = () => {

  const [orderId, setOrderId] = useState(null);

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
  const name = user.name;
  const [loading, setLoading] = useState(false);

  const generatedOrderId = `COD${Date.now()}`;

  const cashOnDeliveryHandler = async () => {
    const CodOrder = {
      shippingInfo,
      orderItems: cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        product: item.product,
      })),
      orderId: generatedOrderId,
      user: userId,
      name,
      paymentInfo: {
        id: "COD",
        status: "Pending",
      },
      itemsPrice: subtotal,
      shippingPrice: shippingCharges,
      totalPrice: amount,
      orderStatus: "Processing",
      paidAt: new Date(), // No payment date since it's COD
    };

    const createdOrder = await dispatch(createCodOrder(CodOrder));

    setLoading(true); // Show loader

    await new Promise((resolve) => setTimeout(resolve, 1000));

    navigate(`/payment/successful/${generatedOrderId}`);

    console.log("COD order is Created Sucessfully");
  };

  const checkoutHandler = async () => {
    try {
      const key = import.meta.env.VITE_RAZORPAY_KEY;

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
          name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Ensures cookies are sent with the request
        }
      );

      const { orderId, amount } = data;
      const createdOrderId = data.orderId; // <- got from API
      setOrderId(createdOrderId); // <-- save in state
       

      // Razorpay options
      const options = {
        key: key,
        amount,
        currency: "INR",
        name: "MaaSparsh",
        description: "Payment Transaction for products",
        order_id: orderId,
        // callback_url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/payment/verification`,
        callback_url: `${import.meta.env.VITE_BACKEND_API_URL}/api/v1/payment/verification`,

        notes: {
          shippingInfo,
          orderItems: cartItems.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            product: item.product,
          })),
          user: userId,
          name,
          itemsPrice: subtotal,
          shippingPrice: shippingCharges,
          totalPrice: amount,
          orderStatus: "Processing",
          paidAt: new Date(), // No payment date since it's COD
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
  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     try {
  //       const { data } = await axiosAPI.get(`/api/v1/order/status/${orderId}`);
    
  //       const status = data.orderStatus.toLowerCase(); // making it lowercase to avoid case issues
    
  //       if (status === "paid" || status === "captured") {
  //         clearInterval(interval);
  //         navigate(`/order/success/${orderId}`);
  //       } else if (status === "failed" || status === "cancelled") {
  //         clearInterval(interval);
          
  //       }
  //       // optional: you can add more else if for pending, refunded etc
  //       else {
  //         // still processing, do nothing
  //         console.log(`Current status: ${status}`);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       clearInterval(interval);
  //       setStatus("Error fetching payment status.");
  //     }
  //   }, 3000); // every 3 seconds
    

  //   return () => clearInterval(interval); // cleanup on unmount
  // }, [orderId, navigate]);
  
  useEffect(() => {
    
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title="Pay Now" />
      <CheckoutSteps activeStep={1} />
      <div className="PaymentPage">
        <div>
          <div className="PaymentCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="PaymentItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product} className="cart-detailss">
                    <img loading="lazy" src={item.image} alt="Product" />
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
                <span>{shippingCharges === 0 ? "Free" : `₹${shippingCharges}`}</span>
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
