// components/Home.js
import React, { useEffect } from "react";
import { getProduct } from "../../actions/productAction"; // Assuming you have a function for fetching products
import { useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useSelector } from "react-redux";
import MiniProduct from "../Home/MiniProduct";


const BroughtTogether = () => {
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
    <div className="product-mini-list">
                 
                  {products &&
                    products.map((product) => (
                      <MiniProduct product={product} />
                    ))}
                </div>
  );
};

export default BroughtTogether;
