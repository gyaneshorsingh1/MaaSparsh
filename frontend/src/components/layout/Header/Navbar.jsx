import React, { useState, useRef, useEffect, forwardRef } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./Navbar.css";
import shopall from "../../../images/baby shampoo.jpg";
// Wrapping FaBars with forwardRef to properly use ref
const FaBarsWithRef = forwardRef((props, ref) => <FaBars {...props} ref={ref} />);

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navbarRef = useRef(null);  // Reference for the navbar element
  const hamburgerRef = useRef(null);  // Reference for the hamburger icon

  // Toggle navigation menu
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Close navigation menu on link click
  const closeNav = () => {
    setIsNavOpen(false);
  };

  // Close the navbar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarRef.current && !navbarRef.current.contains(event.target)
      ) {
        setIsNavOpen(false); // Close the navbar
      }
    };

    // Attach event listener to detect clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array ensures this effect runs once on mount

  return (
    <>
      <nav className="tab-navbar" ref={navbarRef}>
        <FaBarsWithRef
          className="hamburger"
          size={25}
          onClick={toggleNav}
          ref={hamburgerRef}
        />
        <ul
          className={`nav-links ${isNavOpen ? "active fixed" : ""}`}
        >
          {/* <li>
            <Link to="/" onClick={closeNav}>
              Home
            </Link>
          </li> */}
          <li>
            <Link to="/products" onClick={closeNav}>
              All
            </Link>
          </li>
          <li>
            <Link to="/products/bath-rituals" onClick={closeNav}>
              Bath Rituals
            </Link>
          </li>
          <li>
            <Link to="/gifting" onClick={closeNav}>
              Gifting
            </Link>
          </li>
          <li>
            <Link to="/our-exclusives" onClick={closeNav}>
              Our Exclusives
            </Link>
          </li>
          
          <li>
            <Link to="/body-care" onClick={closeNav}>
              Body Care
            </Link>
          </li>
          <li>
            <Link to="/hair-care" onClick={closeNav}>
              Hair Care
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={closeNav}>
              About Us
            </Link>
          </li>
        </ul>
      </nav>
      <nav className="mobile-navbar">
        <div className="mobile-img-nav">
            <img src={shopall} alt="shopall" />
            <p>ShopAll</p>
        </div>
        <div className="mobile-img-nav">
            <img src={shopall} alt="shopall" />
            <p>ShopAll</p>
        </div>
        <div className="mobile-img-nav">
            <img src={shopall} alt="shopall" />
            <p>ShopAll</p>
        </div>
        <div className="mobile-img-nav">
            <img src={shopall} alt="shopall" />
            <p>ShopAll</p>
        </div>
        <div className="mobile-img-nav">
            <img src={shopall} alt="shopall" />
            <p>ShopAll</p>
        </div>
        <div className="mobile-img-nav">
            <img src={shopall} alt="shopall" />
            <p>ShopAll</p>
        </div>
        
      </nav>

      {/* Overlay for dimming/blurring the background */}
      <div className={`overlay ${isNavOpen ? "active" : ""}`} onClick={closeNav}></div>
    </>
  );
};

export default Navbar;
