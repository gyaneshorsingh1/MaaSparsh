import React from "react";
import "./Policy.css";
const ContactUs = () => {
  return (
    <>
      <div className="policy-area">
        <div className="policies">
          <h1>Contact Us</h1>
          <p>
            We love hearing from you! Whether you have a question, concern, or
            feedback, the Maasparash Essence of Ayurveda team is here to help.
          </p>

          <ul>
            <li>
              <strong>Customer Support:</strong> Available Monday to Friday, 9
              AM to 6 PM IST
            </li>
            <li>
              <strong>Phone:</strong> 9472882699
            </li>
            <li>
              <strong>Email:</strong> care@maasparsh.com
            </li>
          
            <li>
              <strong>Address:</strong> AF-104B1, GOLF LINK - 1, GREATER NOIDA, Noida Sector 62, Noida, Gautam Buddha Nagar - 201309, Uttar Pradesh
            </li>
          </ul>

          {/* <p>
            You can also reach out to us via our{" "}
            <a href="/contact-form">Contact Form</a> on the website, and we’ll
            get back to you within 24 hours.
          </p> */}
        </div>
      </div>
    </>
  );
};

export default ContactUs;
