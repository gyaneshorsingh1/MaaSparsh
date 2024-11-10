import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";
import "./Footer.css"; // Import the CSS file

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-links">
          <h3>Quick Tabs</h3>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
        <div className="social-media">
          <h3>MEDIA</h3>
          <p>
            <b>info@maasparsh.in</b>
          </p>
          <p>Maasparash Essence of Ayurveda</p>

          <div>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="social-icon" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="social-icon" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="social-icon" />
            </a>
            <a
              href="https://www.pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaPinterest className="social-icon" />
            </a>
          </div>
        </div>
        <div className="footer-policies">
          <h3>Customer Services</h3>
          <Link to="/policies">All Policies</Link>
          {/* <Link to="/policies/shipping-policy">Shipping policy</Link>
          <Link to="/policies/cancellation-policy">Cancellation Policy</Link>
          <Link to="/policies/return-refund-policy">Return & Refund Policy</Link>
          <Link to="/policies/privacy-policy">Privacy Policy</Link> */}
          <Link to="/policies/terms-of-service">Terms & Conditions</Link>
          <Link to="/policies/track-order">Track Your Order</Link>
          <Link to="/policies/payment-options">Payment Options</Link>
          <Link to="/policies/out-of-stock">Out of Stock Items</Link>
          <Link to="/policies/contact-us">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
