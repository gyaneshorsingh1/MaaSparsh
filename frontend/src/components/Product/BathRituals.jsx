import React, { useEffect, useState } from 'react';
import "./Products.css";
import { clearErrors, getProduct, getProductCategory } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import Pagination from "react-js-pagination";
import { Slider } from "@mui/material"; // Updated import for Slider (Material UI v5)
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import MetaData from '../layout/MetaData';






const BathRituals = () => {
    const dispatch = useDispatch();

    const { products, loading, error } = useSelector((state) => state.products);
    const { keyword } = useParams();

    const category = "Bath Rituals";



    //Paginng products

    useEffect(() => {
        const category = "Bath Rituals";
        if(error){
            toast.error(error);
            dispatch(clearErrors())
        }
        dispatch(getProductCategory(category));
    }, [dispatch, error, category]);

    return (
        <>
            {loading ? <Loader /> : (
                <>
                <MetaData title="PRODUCTS --ECOMM_"/>
                   
                    <h2 className='product-container-titles'>Bath Rituals</h2>

                    <div className='products'>
                        {products &&
                           products.map((product) => (
                            <ProductCard key={product._id} product={product}/>
                           ))
                        }
                    </div>
                    
                </>
            )}
        </>
    );
};

export default BathRituals;
