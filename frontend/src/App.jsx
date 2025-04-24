import React, { useEffect, lazy, Suspense } from "react";
import "./App.css";
import Header from "./components/layout/Header/Header.jsx";
import Navbar from "./components/layout/Header/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop.jsx";
import Footer from "./components/layout/Footer/Footer.jsx";
import ProtectedRoute from "./components/Route/ProtectedRoute.jsx";
import store from "./store.jsx";
import { loadUser } from "./actions/userAction.jsx";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import WhatsAppButton from "./components/layout/WhatsAppButton.jsx";
import DisplayRoutePath from "./DisplayRoutePath.jsx";
import Loader from "./components/layout/Loader/Loader.jsx";

// Lazy loaded components
const Home = lazy(() => import("./components/Home/Home.jsx"));
const ProductDetails = lazy(() => import("./components/Product/ProductDetails.jsx"));
const Products = lazy(() => import("./components/Product/Products.jsx"));
const Search = lazy(() => import("./components/Product/Search.jsx"));
const About = lazy(() => import("./components/About/About.jsx"));
const NewProduct = lazy(() => import("./components/Admin/NewProduct.jsx"));
const Cart = lazy(() => import("./components/Cart/Cart.jsx"));
const Shipping = lazy(() => import("./components/Cart/Shipping.jsx"));
const Payment = lazy(() => import("./components/Cart/Payment.jsx"));
const OrderSuccess = lazy(() => import("./components/Cart/OrderSuccess.jsx"));
const Myorders = lazy(() => import("./components/Order/Myorders.jsx"));
const OrderDetails = lazy(() => import("./components/Order/OrderDetails.jsx"));
const LoginSignUp = lazy(() => import("./components/User/LoginSignUp.jsx"));
const Profile = lazy(() => import("./components/User/Profile.jsx"));
const UpdatePassword = lazy(() => import("./components/User/UpdatePassword.jsx"));
const ForgotPassword = lazy(() => import("./components/User/ForgotPassword.jsx"));
const RestPassword = lazy(() => import("./components/User/RestPassword.jsx"));
const Dashboard = lazy(() => import("./components/Admin/Dashboard.jsx"));
const CashOnDelivery = lazy(() => import("./components/policies/CashOnDelivery.jsx"));
const AllPolicies = lazy(() => import("./components/policies/AllPolicies.jsx"));
const ShippingPolicy = lazy(() => import("./components/policies/ShippingPolicy.jsx"));
const ReturnPolicy = lazy(() => import("./components/policies/ReturnPolicy.jsx"));
const PrivacyPolicy = lazy(() => import("./components/policies/PrivacyPolicy.jsx"));
const TermsOfService = lazy(() => import("./components/policies/TermsOfService.jsx"));
const ContactUs = lazy(() => import("./components/policies/ContactUs.jsx"));
const Cancellation = lazy(() => import("./components/policies/CancellationPolicy.jsx"));
const TrackOrder = lazy(() => import("./components/policies/TrackOrder.jsx"));
const PaymentOptions = lazy(() => import("./components/policies/PaymentOptions.jsx"));
const OutOfStock = lazy(() => import("./components/policies/OutOfStock.jsx"));
const ProductList = lazy(() => import("./components/Admin/ProductList.jsx"));
const UpdateProduct = lazy(() => import("./components/Admin/UpdateProduct.jsx"));
const OrderList = lazy(() => import("./components/Admin/OrderList.jsx"));
const ProcessOrder = lazy(() => import("./components/Admin/ProcessOrder.jsx"));
const UsersList = lazy(() => import("./components/Admin/UsersList.jsx"));
const BathRituals = lazy(() => import("./components/Product/BathRituals.jsx"));
const FeedingRituals = lazy(() => import("./components/Product/FeedingRituals.jsx"));
const OrganicClothing = lazy(() => import("./components/Product/OrganicClothing.jsx"));
const BabyNursing = lazy(() => import("./components/Product/BabyNursing.jsx"));
const Gifting = lazy(() => import("./components/Product/Gifting.jsx"));
const ComingSoon = lazy(() => import("./components/Product/ComingSoon.jsx"));


function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);


  
  // const { location, pathname } = useLocation();
  // const isDashboard = location.pathname === "/admin/dashboard";
  // window.addEventListener("contextmenu",(e) => e.preventDefault());
  // {isAuthenticated && <UserOptions user={user} />}

  return (
    <Router>
      <Header />
      <Navbar />
      <WhatsAppButton />
      <DisplayRoutePath />
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/search" element={<Search />} />
        <Route
          exact
          path="/payment/successful/:id"
          element={<OrderSuccess />}
        />


        <Route exact path="/cart" element={<Cart />} />

        {/* Product Category routes */}
        <Route exact path="/products/bath-rituals" element={<BathRituals />} />
        {/* <Route exact path="/products/feeding-rituals" element={<FeedingRituals />} />
        <Route exact path="/products/organic-clothing" element={<OrganicClothing />} />
        <Route exact path="/products/baby-nursery" element={<BabyNursing />} /> */}
        {/* ProtectedRoute usage */}

        <Route exact path="/gifting" element={<ComingSoon />} />
        <Route exact path="/our-exclusives" element={<ComingSoon />} />
        <Route exact path="/travel-kit" element={<ComingSoon />} />
        <Route exact path="/body-care" element={<ComingSoon />} />
        <Route exact path="/hair-care" element={<ComingSoon />} />

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

        {/* <Route
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="shipping/confirm"
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
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <UsersList />
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
      </Suspense>

      {/* ToastContainer placed here to handle toasts globally */}
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* {!isDashboard && <Footer />} */}
      <Footer />
    </Router>
  );
}

export default App;
