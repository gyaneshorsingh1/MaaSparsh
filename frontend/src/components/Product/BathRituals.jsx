import React, { useEffect, useState } from 'react';
import "./Products.css";
import { clearErrors, getProduct, getProductCategory } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import Pagination from "react-js-pagination";
import { Slider } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { useAlert } from "react-alert"
import MetaData from '../layout/MetaData';






const BathRituals = () => {
    const dispatch = useDispatch();

    const alert = useAlert();

    const { products, loading, error } = useSelector((state) => state.products);
    const { keyword } = useParams();
    //Price filters
    console.log(products);

    const category = "Bath Rituals";



    //Paginng products

    useEffect(() => {
        const category = "Bath Rituals";
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getProductCategory(category));
    }, [dispatch, error, alert, category]);

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

export default BathRituals;
