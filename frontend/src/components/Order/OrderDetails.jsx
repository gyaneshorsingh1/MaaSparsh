import React, { useEffect, useState } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";  // Update to MUI v5
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";  // Import the useParams hook
import { getUserDetails } from "../../actions/userAction";  // Action to fetch user details

const OrderDetails = () => {
  // Use the useParams hook to get the order id from the URL
  const { id } = useParams();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  console.log(order.name)
  const dispatch = useDispatch();


  // Local state to track if the user details have been loaded
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    // Fetch order details using the order id from URL
    dispatch(getOrderDetails(id));
  }, [dispatch, error, id]);

  // Fetch user details if user is not available in the order
  useEffect(() => {
    if (order?.user && !userLoaded) {
      // If order has a user id but user details are not loaded yet
      setUserLoaded(true);
    }
    
  }, [dispatch, order?.user, userLoaded]);

  if (loading) return <Loader />;

  const { shippingInfo, paymentInfo, orderStatus, orderItems, totalPrice } = order || {};

  console.log(shippingInfo);
  console.log(order);
  // Determine payment status classes
  const getPaymentStatusClass = (status) => {
    console.log('Payment Status:', status); // Debugging log to check status value

    if (status === "Paid" || status === "captured") {
      return "greenColor";  // Green color for Paid
    }
    if (status === "COD") {
      return "yellowColor";  // Yellow color for COD
    }
    return "redColor";  // Red color for anything else (e.g., Not Paid)
  };

  return (
    <>
      <MetaData title="Order Details" />
      <div className="orderDetailsPage">
        
      <div className="orderDetailsCartItems">
      <Typography variant="h1">Order #{order?._id}</Typography>
          <h6 className="order-item-sec">Order Items:</h6>
          <div className="orderDetailsCartItemsContainer">
            {orderItems?.map((item) => (
              <div key={item.product} className="order-items-sec">
                <img loading="lazy"
 src={item.image} alt="Product" />
                <Link className="productlink" to={`/product/${item.product}`}>{item.name}</Link>{" "}
                <span>
                  {item.quantity} X ₹{item.price} ={" "}
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="order-details">
  <Typography variant="h6">Shipping Info</Typography>
  <div className="info-box">
    <div className="info-item">
      <p>Name:</p>
      <span>{order.name || "Loading..."}</span>
    </div>
    <div className="info-item">
      <p>Phone:</p>
      <span>{shippingInfo?.phoneNo}</span>
    </div>
    <div className="info-item">
      <p>Address:</p>
      <span>
        {shippingInfo
          ? `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`
          : "Loading..."}
      </span>
    </div>
  </div>

  <Typography variant="h6">Payment</Typography>
  <div className="info-box">
    <div className="payment-status">
      <p className={getPaymentStatusClass(paymentInfo?.status)}>
        {paymentInfo?.status === "Paid" || "captured"
          ? "Paid"
          : paymentInfo?.status === "COD"
          ? "Cash On Delivery"
          : "Not Paid"}
      </p>
    </div>
    <div className="info-item">
      <p>Amount:</p>
      <span>₹{totalPrice}</span>
    </div>
  </div>

  <Typography variant="h6">Order Status</Typography>
  <div className="info-box">
    <div className="order-status">
      <p className={orderStatus === "Delivered" ? "status-success" : "status-failed"}>
        {orderStatus}
      </p>
    </div>
  </div>
</div>


       
      </div>
    </>
  );
};

export default OrderDetails;
