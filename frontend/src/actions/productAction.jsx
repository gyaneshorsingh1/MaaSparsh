import axios from "axios";
import axiosAPI from "./axiosInstance";
import { 
    ALL_PRODUCT_FAIL, 
    ALL_PRODUCT_REQUEST, 
    ALL_PRODUCT_SUCCESS, 
    CLEAR_ERRORS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_PRODUCT_REQUEST, 
    NEW_PRODUCT_SUCCESS, 
    NEW_PRODUCT_FAIL, 
    NEW_PRODUCT_RESET,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_REQUEST,
} from "../constants/productConstants";

// Fetching products action
export const getProduct = (keyword="", currentPage=1, price=[0,25000], category, ratings=0) => async (dispatch) => {
    try {
        // Dispatch the product request action
        dispatch({ type: ALL_PRODUCT_REQUEST });

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if (category) {
          link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }
        // Make an API call to fetch products
        const { data } = await axiosAPI.get(link);

        // Dispatch the success action with the fetched data
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        });

    } catch (error) {
        // Handle errors safely
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : error.message || 'Something went wrong', // Default fallback error message
        });
    }
}



export const getProductCategory = (category) => async (dispatch) => {
    try {
        // Dispatch the product request action
        dispatch({ type: ALL_PRODUCT_REQUEST });

        let link = `/api/v1/products`;

        if (category) {
          link = `/api/v1/products?category=${category}`;
        }
        // Make an API call to fetch products
        const { data } = await axiosAPI.get(link);

        // Dispatch the success action with the fetched data
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        });

    } catch (error) {
        // Handle errors safely
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : error.message || 'Something went wrong', // Default fallback error message
        });
    }
}
//get Admin Products (All Products):

export const getAdminProduct  = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCT_REQUEST });

        const { data } = await axiosAPI.get("/api/v1/admin/products");

        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data.products,

        })
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
}


//create product
export const createProduct = (productData) => async(dispatch)=>{
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json"},
        };
        const { data } = await axiosAPI.post(
            `/api/v1/admin/product/new`,
             productData,
             config
            );
        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};



// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axiosAPI.put(
        `/api/v1/admin/product/${id}`,
        productData,
        config
      );
  
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_PRODUCT_REQUEST });
  
      const { data } = await axiosAPI.delete(`/api/v1/admin/product/${id}`);
  
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };


// Get product details
export const getProductDetails = (id) => async (dispatch) => {
    try {
        // Dispatch the product request action
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        // Make an API call to fetch products
        const { data } = await axiosAPI.get(`/api/v1/product/${id}`);

        // Dispatch the success action with the fetched data
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        });

    } catch (error) {
        // Handle errors safely
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : error.message || 'Something went wrong', // Default fallback error message
        });
    }
}



// New review
export const newReview = (reviewData) => async (dispatch) => {
    try {
        // Dispatch the product request action
        dispatch({ type: NEW_REVIEW_REQUEST });
        const config = {
            headers: { "Content-Type": "application/json"},
        }
        // Make an API call to fetch products
        const { data } = await axiosAPI.put(`/api/v1/review`, reviewData, config);

        // Dispatch the success action with the fetched data
        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.message,
        });

    } catch (error) {
        // Handle errors safely
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : error.message || 'Something went wrong', // Default fallback error message
        });
    }
}


// Clearing errors action
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
}
