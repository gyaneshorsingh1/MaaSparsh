import React, { useEffect, useState } from 'react';
import "./Products.css";
import { clearErrors, getProduct, getProductCategory } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import Pagination from "react-js-pagination";
import { Slider } from "@mui/material"; // Updated import for Slider (Material UI v5)
import { Typography } from "@mui/material"; // Updated import for Typography (Material UI v5)
import { toast } from "react-toastify";
import MetaData from '../layout/MetaData';






const BabyNursing = () => {
    const dispatch = useDispatch();


    const { products, loading, error } = useSelector((state) => state.products);
    const { keyword } = useParams();
    //Price filters
    console.log(products);

    const category = "Baby Nursing";



    //Paginng products

    useEffect(() => {
        const category = "Baby Nursing";
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

export default BabyNursing;
