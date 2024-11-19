import React, { useEffect, useState } from 'react';
import "./Products.css";
import { clearErrors, getProduct, getProductCategory } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import Pagination from "react-js-pagination";
import { Slider } from "@mui/material"; 
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import MetaData from '../layout/MetaData';






const FeedingRituals = () => {
    const dispatch = useDispatch();


    const { products, loading, error } = useSelector((state) => state.products);
    const { keyword } = useParams();

    const category = "Feeding Rituals";

    //Paginng products

    useEffect(() => {
        const category = "Feeding Rituals";
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
                   
                    <h2 className='productsHeading'>Bath Rituals</h2>

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

export default FeedingRituals;
