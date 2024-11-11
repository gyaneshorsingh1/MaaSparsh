import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingCart, FaBars } from "react-icons/fa";
import "./Header.css"; // Import the CSS file
import Logo from "../../../images/logo.png";
import GoBackButton from "../../GoBackButton";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Function to toggle the nav menu
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Function to close the nav menu when a link is clicked
  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <header>
      <div className="top-bar">
      <GoBackButton />
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>

        {/* Icon Section */}
        <div className="icon-links">
          <Link to="/search" aria-label="Search">
            <FaSearch className="icon" size={20} />
          </Link>
          <Link to="/login" aria-label="User Profile">
            <FaUser className="icon" size={20} />
          </Link>
          <Link to="/cart" aria-label="Shopping Cart">
            <FaShoppingCart className="icon" size={20} />
          </Link>
        </div>
      </div>

      {/* Navigation Links */}
      {/* <nav>
        <FaBars className="hamburger" size={25} onClick={toggleNav} />
        <ul className={isNavOpen ? "nav-links active" : "nav-links"}>
          <li>
            <Link to="/products" onClick={closeNav}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/bath-rituals" onClick={closeNav}>
              Bath Rituals
            </Link>
          </li>
          <li>
            <Link to="/feeding-rituals" onClick={closeNav}>
              Feeding Rituals
            </Link>
          </li>
          <li>
            <Link to="/organic-clothing" onClick={closeNav}>
              Organic Clothing
            </Link>
          </li>
          <li>
            <Link to="/baby-nursery" onClick={closeNav}>
              Baby Nursery
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={closeNav}>
              About
            </Link>
          </li>
        </ul>
      </nav> */}
    </header>
  );
};

export default Header;
