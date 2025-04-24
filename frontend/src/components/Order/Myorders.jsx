import React, { Fragment, useEffect } from "react";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Typography } from "@mui/material"; // Updated import for Typography (Material UI v5)
import MetaData from "../layout/MetaData";

const MyOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
  console.log(orders)
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title={`${user?.name || "User"} - Account/Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <Typography id="myOrdersHeading">order History</Typography>
          <div className="ordersContainer">
            {/* Header Row */}
            <div className="orderHeader">
              <div className="orderHeaderItem">Products</div>
              <div className="orderHeaderItem">Date of Order</div>
              <div className="orderHeaderItem">Status</div>
              <div className="orderHeaderItem">Amount</div>
              <div className="orderHeaderItem">Actions</div>
            </div>


            {orders
            ?.slice() // To avoid mutating the original array
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by date descending
            .map((order) => (
              <div key={order._id} className="orderFullRow">
                <div className="orderRow">
                  <div className="orderImgContainer">
                    {order.orderItems.map((item) => (
                      <div key={item._id} className="orderItem">
                        <img loading="lazy"

                          src={item.image}
                          alt={item.name}
                          className="orderItemImage"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="orderDetail">
                    {String(order.createdAt).split("T")[0]}
                  </div>
                  <div
                    className={`orderDetail ${
                      order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }`}
                  >
                    {order.orderStatus}
                  </div>
                  <div className="orderDetail">
                    Rs. {order.totalPrice.toFixed(2)}
                  </div>
                  <div className="orderDetail">
                    <Link to={`/order/${order._id}`} className="actionLink">
                      View
                    </Link>
                  </div>
                </div>
                {/* <div className="orderItemsContainer">
                  {order.orderItems.map((item) => (
                    <div key={item._id} className="orderItem">
                      <img loading="lazy"

                        src={item.image}
                        alt={item.name}
                        className="orderItemImage"
                      />
                      <div className="orderItemDetails">
                        <p className="orderItemName">{item.name}</p>
                        <p className="orderItemPrice">Rs. {item.price}</p>
                        <p className="orderItemQuantity">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div> */}
              </div>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
