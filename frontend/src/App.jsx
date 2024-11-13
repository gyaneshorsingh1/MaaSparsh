import React from "react";
import "./App.css";
import Header from "./components/layout/Header/Header.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop.jsx";
import Footer from "./components/layout/Footer/Footer.jsx";
import Home from "./components/Home/Home.jsx";
import ProductDetails from "./components/Product/ProductDetails.jsx";
import Products from "./components/Product/Products.jsx";
import Search from "./components/Product/Search.jsx";
import About from "./components/About/About.jsx";
import NewProduct from "./components/Admin/NewProduct.jsx";
import Cart from "./components/Cart/Cart.jsx";

import Shipping from "./components/Cart/Shipping.jsx";
import ConfirmOrder from "./components/Cart/ConfirmOrder.jsx";
import Payment from "./components/Cart/Payment.jsx";
import OrderSuccess from "./components/Cart/OrderSuccess.jsx";

import Myorders from "./components/Order/Myorders.jsx";
import OrderDetails from "./components/Order/OrderDetails.jsx";

import LoginSignUp from "./components/User/LoginSignUp.jsx";
import Profile from "./components/User/Profile.jsx";
import UpdateProfile from "./components/User/UpdateProfile.jsx";
import UpdatePassword from "./components/User/UpdatePassword.jsx";
import ForgotPassword from "./components/User/ForgotPassword.jsx";
import RestPassword from "./components/User/RestPassword.jsx";

import Dashboard from "./components/Admin/Dashboard.jsx";

import ProtectedRoute from "./components/Route/ProtectedRoute.jsx";

//policies
import CashOnDelivery from "./components/policies/CashOnDelivery.jsx";
import AllPolicies from "./components/policies/AllPolicies.jsx";
import ShippingPolicy from "./components/policies/ShippingPolicy.jsx";
import ReturnPolicy from "./components/policies/ReturnPolicy.jsx";
import PrivacyPolicy from "./components/policies/PrivacyPolicy.jsx";
import TermsOfService from "./components/policies/TermsOfService.jsx";
import ContactUs from "./components/policies/ContactUs.jsx";
import Cancellation from "./components/policies/CancellationPolicy.jsx";
import TrackOrder from "./components/policies/TrackOrder.jsx";
import PaymentOptions from "./components/policies/PaymentOptions.jsx";
import OutOfStock from "./components/policies/OutOfStock.jsx";

import store from "./store.jsx";
import { loadUser } from "./actions/userAction.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import UserOptions from "./components/layout/Header/UserOptions.jsx";
import ProductList from "./components/Admin/ProductList.jsx";
import UpdateProduct from "./components/Admin/UpdateProduct.jsx"
import OrderList from "./components/Admin/OrderList.jsx";
import ProcessOrder from "./components/Admin/ProcessOrder.jsx";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);


  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/payment/successful/:id" element={<OrderSuccess />} />

        <Route exact path="/cart" element={<Cart />} />

        {/* ProtectedRoute usage */}

        <Route
          path="/product/new"
          element={
            <ProtectedRoute>
              <NewProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />

        {/* Shipping Product */}
        <Route
          path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment/success"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />



        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Myorders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product/:id"
          element={
            <ProtectedRoute>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <OrderList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/order/:id"
          element={
            <ProtectedRoute>
              <ProcessOrder />
            </ProtectedRoute>
          }
        />




        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<RestPassword />} />

        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/admin/product/new" element={<NewProduct />} />
        <Route exact path="/policies" element={<AllPolicies />} />
        <Route
          exact
          path="/policies/cash-on-delivery"
          element={<CashOnDelivery />}
        />
        <Route
          exact
          path="/policies/shipping-policy"
          element={<ShippingPolicy />}
        />
        <Route
          exact
          path="/policies/cancellation-policy"
          element={<Cancellation />}
        />
        <Route
          exact
          path="/policies/return-refund-policy"
          element={<ReturnPolicy />}
        />
        <Route
          exact
          path="/policies/privacy-policy"
          element={<PrivacyPolicy />}
        />
        <Route
          exact
          path="/policies/terms-of-service"
          element={<TermsOfService />}
        />
        <Route exact path="/policies/track-order" element={<TrackOrder />} />
        <Route
          exact
          path="/policies/payment-options"
          element={<PaymentOptions />}
        />
        <Route exact path="/policies/out-of-stock" element={<OutOfStock />} />
        <Route exact path="/policies/contact-us" element={<ContactUs />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
