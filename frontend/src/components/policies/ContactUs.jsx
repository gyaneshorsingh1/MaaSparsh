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
              <strong>Email:</strong> [email address]
            </li>
            <li>
              <strong>Phone:</strong> [contact number]
            </li>
            <li>
              <strong>Address:</strong> [Company Address]
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
