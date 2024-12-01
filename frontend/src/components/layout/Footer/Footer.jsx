import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaGooglePay,
  FaPhone,
  FaYoutube,
} from "react-icons/fa";
import "./Footer.css"; // Import the CSS file
import logo from "../../../images/logo-without-text.png"
import Search from "../../Product/Search";
import footerBanner from "../../../images/footerbanner.png";
import Cicon from "../../../images/Cicon.png";
import Ricon from "../../../images/Ricon.png";
import TMicon from "../../../images/TMicon.png";
import gpay from "../../../images/gpay.png";
import phonepay from "../../../images/phonepay.png";
import paybox from "../../../images/paybox.png";
import instaicon from "../../../images/insta-icon.png";
import leaf from "../../../images/leaf.png";
const Footer = () => {
  return (
    <>
    <footer>
      <div className="footer-container">
      <div className="footer-links">
          <h3>Our Products</h3>
          <Link to="/about">All products</Link>
          <Link to="/contact">Giftings</Link>
          <Link to="/privacy">Our exclusives</Link>
          <Link to="/hair-care">Hair Care</Link>
          <Link to="/body-care">Body Care</Link>
          <Link to="/demos">Demos</Link>
          <Link to="/blogs">Blogs</Link>

        </div>

        <div className="footer-links">
          <h3>Our Story</h3>
          <Link to="/about">Our Philosophy</Link>
          <Link to="/contact">Social Responsibility</Link>
          <Link to="/privacy">Media & Press</Link>
          <Link to="/terms">Policies</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/terms">FAQs</Link>
          <Link to="/terms">MaSparsh Club FAQs</Link>
        </div>
        <div className="footer-policies  footer-links">
          <h3>Customer Services</h3>
          <Link to="/policies/shipping-policy">Shipping policy</Link>
          <Link to="/policies/return-refund-policy">Return Policy</Link>
          <Link to="/policies/privacy-policy">Privacy Policy</Link>
          <Link to="/policies/terms-of-service">Terms & Conditions</Link>
          <Link to="/policies/track-order">Track Order</Link>
          <Link to="/policies/contact-us">Contact Us</Link>
          <Link to="/policies/store">Stores</Link>
          <div className="curtomer-services-c-r-tm-icons">
            <img src={Cicon} alt="masparsh-copyrights" />
            <img src={Ricon} alt="masparsh-right" />
            <img src={TMicon} alt="masparsh-india" />
          </div>
        </div>


        <div className="social-media">
          <h3>Contact</h3>
          <p className="contact-p">
            <b>info@maasparsh.in</b>
            <p className="contact-p">+91-9999999999</p>
          </p>
          <p className="img-p"><img src={logo} alt="masparsha logo" /></p>
          <h4 className="contact-payment">SECURE PAYMENTS</h4>
          <div className="payicons">
            <img className="pay-icon" src={gpay} alt="masparsh-gpay" />
            <img className="pay-icon" src={phonepay} alt="masparsh-phonepay" />
            <img className="pay-icon" src={paybox} alt="masparsh-gpay" />
          </div>
          
        </div>
        
        <div className="search-footer">
          <div>
            <h3 className="footer-offer">YES, I WANT TO HEAR ABOUT SPECIAL<br/> OFFERS AND INSIDER PEAKS</h3>
          </div>
          <div className="footer-search">
              <Search className="search-field" />
          </div>
          <h4 className="stay-in-touche">STAY IN TOUCH</h4>
          <div>
          <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* <FaInstagram className="social-icon" color="rgb(204, 63, 120)" /> */}
              <img className="insta-icon social-icon" src={instaicon} alt="masparsh insta img" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="social-icon" color="blue" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="social-icon youtube-icon" color="red"/>
            </a>

          </div>

        </div>
      </div>
      <img src={leaf} alt="masparsh-leaf" className="footer-leaf" />
      
    </footer>
    <img src={footerBanner} alt="footerbanner" className="footer-img" />
    </>
  );
};

export default Footer;
