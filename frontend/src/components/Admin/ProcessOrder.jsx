import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link, useNavigate, useParams } from "react-router-dom"; // <-- Make sure Link is imported here
import { Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import { getOrderDetails, clearErrors, updateOrder } from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Button } from "@mui/material";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import { getUserDetails } from "../../actions/userAction";
import "./processOrder.css";

const ProcessOrder = () => {
  const { id } = useParams(); // Get the order ID from the URL
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate(); // React Router v6

  // Get order details and loading/error state from Redux
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const [status, setStatus] = useState("");
  const [userDetails, setUserDetails] = useState(null); // Add state to hold user details

  // Fetch user details once the order is loaded
  useEffect(() => {
    if (order?.user) {
      // Dispatch the action to get user details
      dispatch(getUserDetails(order.user));
    }
  }, [dispatch, order?.user]); // Only dispatch if order and user ID are available

  const { user } = useSelector((state) => state.userDetails); // Get user details from Redux state

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
      navigate("/admin/orders");
    }

    dispatch(getOrderDetails(id)); // Fetch order details based on the ID from the URL
  }, [dispatch, alert, error, updateError, isUpdated, id, navigate]);

  if (loading) {
    return <Loader />;
  }

  if (!order) {
    return <Typography variant="h6">No order found</Typography>;
  }

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <div
            className="confirmOrderPage"
            style={{
              display: order.orderStatus === "Delivered" ? "block" : "grid",
            }}
          >
            <div>
              <div className="confirmshippingArea">
                <Typography variant="h6">Shipping Info</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Name:</p>
                    <span>{user?.name || "Loading..."}</span> {/* Display user name once loaded */}
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>{order.shippingInfo?.phoneNo}</span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </span>
                  </div>
                </div>

                <Typography variant="h6">Payment</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order.paymentInfo && order.paymentInfo.status === "Paid"
                          ? "greenColor"
                          : "yellowColor" // Updated to show yellow for COD
                      }
                    >
                      {order.paymentInfo && order.paymentInfo.status === "Paid" ? "PAID" : "COD"}
                    </p>
                  </div>
                  <div>
                    <p>Amount:</p>
                    <span>{order.totalPrice && order.totalPrice}</span>
                  </div>
                </div>

                <Typography variant="h6">Order Status</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order.orderStatus && order.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.orderStatus && order.orderStatus}
                    </p>
                  </div>
                </div>
              </div>
              <div className="confirmCartItems">
                <Typography variant="h6">Your Cart Items:</Typography>
                <div className="confirmCartItemsContainer">
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <div key={item.product}>
                        <img src={item.image} alt="Product" />
                        <Link to={`/product/${item.product}`}>{item.name}</Link> {/* Link is now imported */}
                        <span>
                          {item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div
              style={{
                display: order.orderStatus === "Delivered" ? "none" : "block",
              }}
            >
              <form className="updateOrderForm" onSubmit={updateOrderSubmitHandler}>
                <h1>Process Order</h1>

                <div>
                  <AccountTreeIcon />
                  <select onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Choose Status</option>
                    {order.orderStatus === "Proccessing" && <option value="Shipped">Shipped</option>}
                    {order.orderStatus === "Shipped" && <option value="Delivered">Delivered</option>}
                  </select>
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={loading || status === ""}
                >
                  Process
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
