import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart, FaTimes } from "react-icons/fa";
import Cart from "../../Cart/Cart";
import "./Header.css";
import Logo from "../../../images/logo.png";
import Search from "../../Product/Search";

const Header = () => {
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

          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </div>

          {/* Icons */}
          <div className="icon-links">
            <Link to="/login" aria-label="User Profile">
              <FaUser className="icon" size={40} />
            </Link>
            <button
              className="cart-icon"
              aria-label="Shopping Cart"
              onClick={toggleCart}
            >
              <FaShoppingCart className="icon" size={40} />
            </button>
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
              <FaTimes size={24} />
            </button>

            <Cart handleCloseCart={handleCloseCart} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
