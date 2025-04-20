
// src/reducers/wishlistReducer.js
import {
    ADD_TO_WISHLIST,
    REMOVE_FROM_WISHLIST,
    CLEAR_WISHLIST,
  } from "../constants/wishlistConstants";
  
  const initialState = {
    items: localStorage.getItem("wishlistItems")
      ? JSON.parse(localStorage.getItem("wishlistItems"))
      : [],
  };
  
  export const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TO_WISHLIST:
        const item = action.payload;
        const isItemExist = state.items.find((i) => i.product === item.product);
        return {
          ...state,
          items: isItemExist
            ? state.items.map((i) => (i.product === item.product ? item : i))
            : [...state.items, item],
        };
  
      case REMOVE_FROM_WISHLIST:
        return {
          ...state,
          items: state.items.filter((i) => i.product !== action.payload),
        };
  
      case CLEAR_WISHLIST:
        return {
          ...state,
          items: [],
        };
  
      default:
        return state;
    }
  };
  