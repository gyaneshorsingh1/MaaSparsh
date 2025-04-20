import React, { useEffect, useState } from "react";
import "./Products.css";


import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";


import { useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import { Slider } from "@mui/material"; // Updated import for Slider (Material UI v5)
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";

import leaf from "../../images/leaf-1.png";
import productsBanner from "../../images/products-banner.jpg";

const categories = [
  "Products",
  "Bath Rituals",
  "Everyday Wellness",
  "Feeding Rituals",
  "Organic Clothing",
  "Baby Nursery",
];

const Products = () => {
  const dispatch = useDispatch();

  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  //Price filters
  const [price, setPrice] = useState([0, 25000]);
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  //Paginng products
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const { keyword } = useParams(); // Using useParams to access URL parameter

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  // Reset filters when 'Products' category is selected
  const resetFilters = () => {
    setCategory("");
    setPrice([0, 25000]);
    setRatings(0);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, error]);
  const dynamicTitle = category ? `${category}` : "Products";

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="product-list">
          <section className="ProductBanner">
              <img src={productsBanner} alt="masparsha products banner" />
            </section>
            <MetaData title="PRODUCTS --ECOMM_" />
            <div className="filterBox">
              {/* <Typography>Price
                            <Slider
                               value={price}
                               onChange={priceHandler}
                               valueLabelDisplay="auto"
                               aria-labelledby="range-slider"
                               min={0}
                               max={25000}
                            />
                        </Typography> */}

              {/* <fieldset>
                                <Typography component="legend">Ratings Above</Typography>
                                <Slider
                                    value={ratings}
                                    onChange={(e, newRating)=>{
                                        setRatings(newRating);
                                    }}
                                    aria-labelledby='continuous-slider'
                                    valueLabelDisplay="on"
                                    min={0}
                                    max={5}
                                />
                            </fieldset> */}
            </div>


          <div className="product-bg">

          
            <h2 className="product-container-titles">{dynamicTitle}</h2>
            <p className="product-container-title-des">List of all the available products in our store. </p>
            <img className="leaf1" src={leaf} alt="" />
            <div className="products">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>

            </div>

            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Products;
