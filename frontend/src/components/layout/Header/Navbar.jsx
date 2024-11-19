import React, { useState, useRef, useEffect, forwardRef } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./Navbar.css";

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
          <li>
            <Link to="/" onClick={closeNav}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" onClick={closeNav}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/products/bath-rituals" onClick={closeNav}>
              Bath Rituals
            </Link>
          </li>
          <li>
            <Link to="/products/feeding-rituals" onClick={closeNav}>
              Feeding Rituals
            </Link>
          </li>
          <li>
            <Link to="/products/organic-clothing" onClick={closeNav}>
              Organic Clothing
            </Link>
          </li>
          <li>
            <Link to="/products/baby-nursery" onClick={closeNav}>
              Baby Nursery
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={closeNav}>
              About
            </Link>
          </li>
        </ul>
      </nav>

      {/* Overlay for dimming/blurring the background */}
      <div className={`overlay ${isNavOpen ? "active" : ""}`} onClick={closeNav}></div>
    </>
  );
};

export default Navbar;
