import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./OrderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";

const OrderSuccess = () => {
  const { id } = useParams();

  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Your Order has been Placed successfully.</Typography>
      <p>Order Reference id: <span style={{color: "green"}}>{id}</span></p>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
