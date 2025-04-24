import React, { useState, useRef, useEffect, forwardRef } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./Navbar.css";
import shopall from "../../../images/mainbanner2.jpg";
import BathRituals from "../../../images/main-banner.jpg";
import notFound from "../../../images/notfound.jpg";
import aboutBanner from "../../About/aboutImages/aboutBanner.jpg";
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
          {/* <li>
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
          </li> */}
          <li>
            <Link to="/about" onClick={closeNav}>
              About Us
            </Link>
          </li>
        </ul>
      </nav>
      <nav className="mobile-navbar">
  <div className="mobile-img-nav">
    <Link to="/products">
      <img loading="lazy"
 src={shopall} alt="shopall" />
      <p>All</p>
    </Link>
  </div>
  <div className="mobile-img-nav">
    <Link to="/products/bath-rituals">
      <img loading="lazy"
 src={BathRituals} alt="bath rituals" />
      <p>Bath Rituals</p>
    </Link>
  </div>
  {/* <div className="mobile-img-nav">
    <Link to="/gifting">
      <img loading="lazy"
 src={notFound} alt="gifting" />
      <p>Gifting</p>
    </Link>
  </div>
  <div className="mobile-img-nav">
    <Link to="/our-exclusives">
      <img loading="lazy"
 src={notFound} alt="our exclusives" />
      <p>Our Exclusives</p>
    </Link>
  </div>
  <div className="mobile-img-nav">
    <Link to="/body-care">
      <img loading="lazy"
 src={notFound} alt="body care" />
      <p>Body Care</p>
    </Link>
  </div>
  <div className="mobile-img-nav">
    <Link to="/hair-care">
      <img loading="lazy"
 src={notFound} alt="hair care" />
      <p>Hair Care</p>
    </Link>
  </div> */}
  <div className="mobile-img-nav">
    <Link to="/about">
      <img loading="lazy"
 src={aboutBanner} alt="about us" />
      <p>About Us</p>
    </Link>
  </div>
</nav>


      {/* Overlay for dimming/blurring the background */}
      <div className={`overlay ${isNavOpen ? "active" : ""}`} onClick={closeNav}></div>
    </>
  );
};

export default Navbar;
