import React, { Fragment, useEffect } from "react";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Typography } from "@mui/material"; // Updated import for Typography (Material UI v5)
import MetaData from "../layout/MetaData";
import Navbar from "../layout/Header/Navbar";

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
  console.log(orders)
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${user?.name || "User"} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
         
          <Typography id="myOrdersHeading">{user?.name}'s Orders</Typography>
          <div className="tableContainer">
            <table className="ordersTable">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Status</th>
                  <th>Items Qty</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td className={order.orderStatus === "Delivered" ? "greenColor" : "redColor"}>
                      {order.orderStatus}
                    </td>
                    <td>{order.orderItems.length}</td>
                    <td>Rs. {order.totalPrice.toFixed(2)}</td>
                    <td>
                      <Link to={`/order/${order._id}`} className="actionLink">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
