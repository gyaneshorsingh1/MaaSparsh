import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges =  0;

  const totalPrice = subtotal + shippingCharges;
  
  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/payment/success");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <div className="confirmOrderPage">
        <div>
          {/* <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div className="shippingInfoCon">
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div  className="shippingInfoCon">
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div  className="shippingInfoCon">
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div> */}
          <div className="confirmCartItems">
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <span>
                    <img src={item.image} alt="Product" /><span className="quantity-value">{item.quantity}</span>
                    <Link to={`/product/${item.product}`}>
                      {item.name} <br />
                      <span>100ml</span>
                    </Link>{" "}

                    </span>
                    <span>
                      {/* {item.quantity} X ₹{item.price} ={" "} */}
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <div>
              <div>
                <p>Sub-Total:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              
            </div>

            <div className="orderSummaryTotal">
              <p className="total-price">
                Total:
              <span>₹{totalPrice}</span>
              </p>
              <p className="taxes-included-info">(MRP Inclusive of all Taxes)</p>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
