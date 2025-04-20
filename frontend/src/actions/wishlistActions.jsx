import {
    ADD_TO_WISHLIST,
    REMOVE_FROM_WISHLIST,
    CLEAR_WISHLIST,
  } from "../constants/wishlistConstants";
  import axiosAPI from "./axiosInstance";

  // Add to Wishlist
export const addToWishlist = (id) => async (dispatch, getState) => {
    const { data } = await axiosAPI.get(`/api/v1/product/${id}`);
  
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
      },
    });
  
    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.items));
  };
  
  // Remove from Wishlist
  export const removeFromWishlist = (id) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_FROM_WISHLIST,
      payload: id,
    });
  
    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.items));
  };
  
  // Clear Wishlist
  export const clearWishlist = () => {
    return {
      type: CLEAR_WISHLIST,
    };
  };