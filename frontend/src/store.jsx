import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { newProductReducer, newReviewReducer, productDetailsReducer, productsReducer, productReducer } from './reducers/productReducer';
import { allUsersReducer, forgotPasswordReducer, userDetailsReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { allOrdersReducer, myOrdersReducer, newCodOrderReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducers/orderReducer';
import { wishlistReducer } from "./reducers/wishlistReducer"
const reducer = {
    products: productsReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    newOrder: newOrderReducer,
    newCodOrder: newCodOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    product: productReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
};

// Initial state setup
let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {},
    },
};

// Configure store with thunk middleware and devtools enabled
const store = configureStore({
    reducer, // Reducers
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Adding redux-thunk to the middleware
    devTools: true, // Automatically enable Redux DevTools in development
});

export default store;
