// components/Home.js
import React, { useEffect } from "react";
import { getProduct } from "../../actions/productAction"; // Assuming you have a function for fetching products
import { useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import "./ProductList.css";
import leaf from "../../images/leaf-2.png"
const ProductList = () => {
  const { products, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  return loading ? (
    <Loader />
  ) : (
    <div className="product-list-container">
                 <img src={leaf} alt="" className="leaf" />
                  {products &&
                    products.map((product) => (
                      <ProductCard product={product} />
                    ))}

                  {products && products.length > 0 && (
                    <ProductCard product={products[0]} />
                  )}
                </div>
  );
};

export default ProductList;
