import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid"; // Updated import for DataGrid
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
    clearErrors,
    getAdminProduct,
    deleteProduct,
} from "../../actions/productAction";

import { Link, useNavigate } from "react-router-dom"; // Updated for React Router v6
import { useAlert } from "react-alert";
import { Button } from "@mui/material"; // Updated Material UI imports
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit"; // Updated import for Material UI v5
import DeleteIcon from "@mui/icons-material/Delete"; // Updated import for Material UI v5
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";


const ProductList = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, products } = useSelector((state) => state.products);
    const { isDeleted,  error: deleteError,} = useSelector((state)=> state.product);
    
    console.log(isDeleted);

    const deleteProductHandler = (id) =>{
      dispatch(deleteProduct(id));
    }



    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
          alert.error(deleteError);
          dispatch(clearErrors());
      }

      if(isDeleted){
        alert.success("Product Deleted Successfully");
        navigate("/admin/dashboard")
        dispatch({ type: DELETE_PRODUCT_RESET });
      }

        dispatch(getAdminProduct());
    }, [dispatch, alert, error,
       deleteError, isDeleted
      ]);



    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "price",
            headerName: "Price",
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
                const productId = params.row.id; // Access product ID from row data
                return (
                    <>
                        {/* <Link to={`/admin/product/${productId}`}>
                            <Button variant="outlined" color="primary">
                                <EditIcon />
                            </Button>
                        </Link> */}

                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => deleteProductHandler(productId)}
                        >
                            <DeleteIcon />
                        </Button>
                    </>
                );
            },
        },
    ];

    const rows = products.map((item) => ({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
    }));

    return (
        <>
            <MetaData title={`ALL PRODUCTS - Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>

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

export default ProductList;
