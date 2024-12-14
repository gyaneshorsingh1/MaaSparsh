import React, { useState} from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import Cart from "../../Cart/Cart";
import "./Header.css";
import Logo from "../../../images/logo.png";
import Search from "../../Product/Search";
import carticon from "../../../images/carticon.png";
import wishlist from "../../../images/wishlist.png";
import cartcount from "../../../images/cartcount.png";
import Profile from "../../../images/Profile.png";
const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartClosing, setIsCartClosing] = useState(false);

  // Toggle Cart visibility
  const toggleCart = () => {
    if (isCartOpen) {
      handleCloseCart();
    } else {
      setIsCartOpen(true);
    }
  };

  // Close Cart with animation
  const handleCloseCart = () => {
    setIsCartClosing(true); // Start the closing animation
    setTimeout(() => {
      setIsCartOpen(false); // Hide the cart after the animation
      setIsCartClosing(false); // Reset the closing state
    }, 300); // Match the animation duration (ensure this matches your CSS)
  };

  return (
    <>
      <header>
        <div className="top-bar">
          {/* Search Component */}
          <div className="search">
            <Search />
          </div>
          {/* <div className="search-icon-header">
             <img src={searchicon} className="icon" alt="searchicon" />
          </div> */}

          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </div>

          {/* Icons */}
          <div className="icon-links">
          <Link to="/" aria-label="wishlist">
              <img className="icon wishlist" src={wishlist} alt="wishlist" />
            </Link>
            <Link to="/login" aria-label="Profile">
              <img className="icon" src={Profile} alt="profile" />
            </Link>
            <button
              className="cart-icon"
              aria-label="Shopping Cart"
              onClick={toggleCart}
            >
              <img className="icon" src={carticon} alt="carticon" />
            </button>
            <span className="cart-count-sec">
               <img className="count-icon" src={cartcount} alt="countcount" /> <span className="cart-product-count">{cartItems.length}</span>
            </span>
          </div>
        </div>
      </header>

      {/* Cart Overlay and Cart */}
      {isCartOpen && (
        <div
          className={`cart-overlay ${
            isCartClosing ? "cart-closing" : "cart-opening"
          }`}
          onClick={(e) => {
            if (e.target.classList.contains("cart-overlay")) handleCloseCart();
          }}
        >
          <div
            className={`cart-container ${
              isCartClosing ? "cart-closing" : "cart-opening"
            }`}
          >
            <span className="cart-text">Cart</span>
            <button className="cart-close-btn" onClick={handleCloseCart}>
              <FaTimes className="fa-close"/>
            </button>

            <Cart handleCloseCart={handleCloseCart} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
