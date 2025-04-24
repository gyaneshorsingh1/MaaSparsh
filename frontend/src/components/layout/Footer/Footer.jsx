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
import logo from "../../../images/logo.png"
import Search from "../../Product/Search";
import footerBanner from "../../../images/footerbanner.jpg";
import Cicon from "../../../images/Cicon.png";
import Ricon from "../../../images/Ricon.png";
import TMicon from "../../../images/TMicon.png";
import gpay from "../../../images/gpay.png";
import phonepay from "../../../images/phonepay.png";
import paybox from "../../../images/paybox.png";
import instaicon from "../../../images/insta-icon.png";

import amazon from "../../../images/amazon.png";
import flipkart from "../../../images/flipkart.png";
import ContactUs from "./ContactUs.jsx";

const Footer = () => {
  return (
    <>
    <footer>
      <div className="footer-container">
      <div className="footer-links">
          <h3>Our Products</h3>
          <Link to="/products">All products</Link>
          <Link to="/products/bath-rituals">Bath Rituals</Link>
          {/* <Link to="/our-exclusives">Our exclusives</Link>
          <Link to="/hair-care">Hair Care</Link>
          <Link to="/body-care">Body Care</Link> */}
          {/* <Link to="/demos">Demos</Link>
          <Link to="/blogs">Blogs</Link> */}

        </div>

        {/* <div className="footer-links">
          <h3>Our Story</h3>
          <Link to="/about">Our Philosophy</Link>
          <Link to="/contact">Social Responsibility</Link>
          <Link to="/privacy">Media & Press</Link>
          <Link to="/terms">Policies</Link>
          <Link to="/policies/terms-of-service">Terms</Link>
          <Link to="/terms">MaSparsh FAQs</Link>
        </div> */}
        <div className="footer-policies  footer-links">
          <h3>Customer Services</h3>
          <Link to="/policies/shipping-policy">Shipping policy</Link>
          <Link to="/policies/return-refund-policy">Return Policy</Link>
          <Link to="/policies/privacy-policy">Privacy Policy</Link>
          <Link to="/policies/terms-of-service">Terms & Conditions</Link>
          <Link to="/policies/contact-us">Contact Us</Link>
          <Link to="/policies/store">Stores</Link>
        </div>


        <div className="social-media">
          <h3>Contact</h3>
          <p className="contact-p">
            <p className="contact-p-address">LENNON LIFESCIENCE PRIVATE LIMITED</p>
            <a href="mailto: care@maasparsh.com" className="email-a"><b>care@maasparsh.com</b></a>
            <p className="contact-p-address">AF-104B1, GOLF LINK - 1, GREATER NOIDA, Noida Sector 62, Noida, Gautam Buddha Nagar - 201309, Uttar Pradesh</p>
            <div className="curtomer-services-c-r-tm-icons">
            <img loading="lazy"
 src={Cicon} alt="masparsh-copyrights" />
            <img loading="lazy"
 src={Ricon} alt="masparsh-right" />
            <img loading="lazy"
 src={TMicon} alt="masparsh-india" />
          </div>
          </p>
          <p className="img-p"><img loading="lazy"
 src={logo} alt="masparsha logo" /></p>
          <h4 className="contact-payment">SECURE PAYMENTS</h4>
          <div className="payicons">
            <img loading="lazy"
 className="pay-icon" src={gpay} alt="masparsh-gpay" />
            <img loading="lazy"
 className="pay-icon" src={phonepay} alt="masparsh-phonepay" />
            <img loading="lazy"
 className="pay-icon" src={paybox} alt="masparsh-gpay" />
          </div>
          
        </div>
        
        <div className="search-footer">
          <div>
            <h3 className="footer-offer">YES, I WANT TO HEAR ABOUT SPECIAL OFFERS AND INSIDER PEAKS</h3>
          </div>
          <div className="footer-search">
              <ContactUs className="search-field" />
          </div>
          <h4 className="stay-in-touche">STAY IN TOUCH</h4>
          <div className="social-medias">
          <a
              href="https://www.instagram.com/maasparsh?igsh=MWRucTIyem9mYnV6ZQ=="
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* <FaInstagram className="social-icon" color="rgb(204, 63, 120)" /> */}
              <img loading="lazy"
 className="insta-icon social-icon" src={instaicon} alt="masparsh insta img" />
            </a>
            <a
              href="https://www.facebook.com/permalink.php?story_fbid=122106684572572520&id=61567175622637&substory_index=413017935180151 "
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="social-icon" color="blue" />
            </a>
            <a
              href="https://youtube.com/@maasparshessenceofayurveda?si=NKkZ1IPgSKmvuJep"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="social-icon youtube-icon" color="red"/>
            </a>
            <a
              href="https://www.flipkart.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img loading="lazy"
 className="flipkart youtube" src={flipkart} alt="" />
            </a>
            <a
              href="https://www.amazon.in/l/27943762031?ie=UTF8&marketplaceID=A21TJRUUN4KGV&product=B0DPZNQK5G&me=AYECXUWL53VFO"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img loading="lazy"
 src={amazon} className=" amazon youtube" alt="" />
            </a>

          </div>

        </div>
      </div>
      {/* <img loading="lazy"
 src={leaf} alt="masparsh-leaf" className="footer-leaf" /> */}
      
    </footer>
    <img loading="lazy"
 src={footerBanner} alt="footerbanner" className="footer-img"/>
    </>
  );
};

export default Footer;
