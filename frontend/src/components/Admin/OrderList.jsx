import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid"; // Updated import for DataGrid
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";


import { Link, useNavigate, useParams } from "react-router-dom"; // Updated for React Router v6
import { useAlert } from "react-alert";
import { Button } from "@mui/material"; // Updated Material UI imports
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit"; // Updated import for Material UI v5
import DeleteIcon from "@mui/icons-material/Delete"; // Updated import for Material UI v5
import SideBar from "./Sidebar";

import { deleteOrder, getAllOrders, clearErrors } from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";


const OrderList = () => {
  
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, orders } = useSelector((state) => state.allOrders);
    const { isDeleted,  error: deleteError,} = useSelector((state)=> state.order);


    const deleteOrderHandler = (id) =>{
      dispatch(deleteOrder(id));
    }



    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }


      if(isDeleted){
        alert.success("Order Deleted Successfully");
        navigate("/admin/dashboard");
        dispatch({ type: DELETE_ORDER_RESET });
      }
      if (deleteError) {
        alert.error(deleteError);
        dispatch(clearErrors());
    }

        dispatch(getAllOrders());
    }, [dispatch, alert, error,
       deleteError, isDeleted
      ]);



    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
        {
          field: "status",
          headerName: "Status",
          minWidth: 150,
          flex: 0.5,
          cellClassName: (params) =>
            params.row.status === "Delivered" ? "greenColor" : "redColor",
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 150,
          flex: 0.3,
        },
        {
          field: "amount",
          headerName: "Amount",
          type: "number",
          minWidth: 270,
          flex: 0.5,
        },
        {
            field: "actions",
            headerName: "Actions",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            sortable: false,
            renderCell: (params) => {
                const orderId = params.row.id; // Access product ID from row data
                return (
                    <>
                        <Link to={`/admin/order/${orderId}`}>
                            <Button variant="outlined" color="primary">
                                <EditIcon />
                            </Button>
                        </Link>

                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => deleteOrderHandler(orderId)}
                        >
                            <DeleteIcon />
                        </Button>
                    </>
                );
            },
        },
    ];

    const rows = [];

    orders &&
      orders.forEach((item) => {
        rows.push({
          id: item._id,
          itemsQty: item.orderItems.length,
          amount: item.totalPrice,
          status: item.orderStatus,
        });
      });

    return (
        <>
            <MetaData title={`Admin -- All Orders`} />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL ORDERS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </>
    );
};

export default OrderList;
