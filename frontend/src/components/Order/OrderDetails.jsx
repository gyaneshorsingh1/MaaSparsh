import React, { useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";  // Update to MUI v5
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";  // Import the useParams hook

const OrderDetails = () => {
  // Use the useParams hook to get the order id from the URL
  const { id } = useParams();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    // Dispatch the action to get order details using the id from the URL
    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);  // use `id` from `useParams`

  if (loading) return <Loader />;

  const { shippingInfo, paymentInfo, orderStatus, orderItems, totalPrice, user } = order || {};

  return (
    <>
      <MetaData title="Order Details" />
      <div className="orderDetailsPage">
        <div className="orderDetailsContainer">
          <Typography variant="h5">Order #{order?._id}</Typography>
          <Typography variant="h6">Shipping Info</Typography>
          <div className="orderDetailsContainerBox">
            <div>
              <p>Name:</p>
              <span>{user?.name}</span>
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
              <p className={paymentInfo?.status === "succeeded" ? "greenColor" : "redColor"}>
                {paymentInfo?.status === "succeeded" ? "PAID" : "NOT PAID"}
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

        <div className="orderDetailsCartItems">
          <Typography variant="h6">Order Items:</Typography>
          <div className="orderDetailsCartItemsContainer">
            {orderItems?.map((item) => (
              <div key={item.product}>
                <img src={item.image} alt="Product" />
                <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                <span>
                  {item.quantity} X ₹{item.price} ={" "}
                  <b>₹{item.price * item.quantity}</b>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
