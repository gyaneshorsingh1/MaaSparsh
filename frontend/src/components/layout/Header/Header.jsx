import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart, FaBars } from "react-icons/fa";
import "./Header.css";
import Logo from "../../../images/logo.png";
import Search from "../../Product/Search";

const Header = () => {


  return (
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
          <Link to="/cart" aria-label="Shopping Cart">
            <FaShoppingCart className="icon" size={40} />
          </Link>
        </div>
      </div>

      
    </header>
  );
};

export default Header;
