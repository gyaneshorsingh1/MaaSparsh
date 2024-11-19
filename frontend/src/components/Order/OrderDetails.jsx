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
  const { user } = useSelector((state) => state.userDetails); // Access user details from Redux state
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
      dispatch(getUserDetails(order.user));
      setUserLoaded(true);
    }
  }, [dispatch, order?.user, userLoaded]);

  if (loading) return <Loader />;

  const { shippingInfo, paymentInfo, orderStatus, orderItems, totalPrice } = order || {};

  // Determine payment status classes
  const getPaymentStatusClass = (status) => {
    console.log('Payment Status:', status); // Debugging log to check status value

    if (status === "Paid") {
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
          <Typography variant="h6">Order Items:</Typography>
          <div className="orderDetailsCartItemsContainer">
            {orderItems?.map((item) => (
              <div key={item.product}>
                <img src={item.image} alt="Product" />
                <Link className="productlink" to={`/product/${item.product}`}>{item.name}</Link>{" "}
                <span>
                  {item.quantity} X ₹{item.price} ={" "}
                  <b>₹{item.price * item.quantity}</b>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="orderDetailsContainer">
         

          <Typography variant="h6">Shipping Info</Typography>
          <div className="orderDetailsContainerBox">
            <div>
              <p>Name:</p>
              <span>{user?.name || "Loading..."}</span> {/* Display the user name once loaded */}
            </div>
            <div>
              <p>Phone:</p>
              <span>{shippingInfo?.phoneNo}</span>
            </div>
            <div>
              <p>Address:</p>
              <span>{shippingInfo ? `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}` : null}</span>
            </div>
          </div>

          <Typography variant="h6">Payment</Typography>
          <div className="orderDetailsContainerBox">
            <div>
              {/* Apply the dynamic class for payment status */}
              <p className={getPaymentStatusClass(paymentInfo?.status)}>
                {paymentInfo?.status === "Paid" ? "Paid" : paymentInfo?.status === "COD" ? "Cash On Delivery" : "Not Paid"}
              </p>
            </div>
            <div>
              <p>Amount:</p>
              <span>{totalPrice}</span>
            </div>
          </div>

          <Typography variant="h6">Order Status</Typography>
          <div className="orderDetailsContainerBox">
            <div>
              <p className={orderStatus === "Delivered" ? "greenColor" : "redColor"}>
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
