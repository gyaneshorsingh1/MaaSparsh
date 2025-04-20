import React from "react";
import "./OurStore.css";
const OurStore = () => {
  return (
    <>
      <div className="store-container">
        <h2 className="our-store">Our Store</h2>
        <div style={{ width: "100%", height: "auto" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3608.5378675479783!2d86.99931777538363!3d25.25248577767538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDE1JzA5LjAiTiA4N8KwMDAnMDYuOCJF!5e0!3m2!1sen!2sin!4v1739640357399!5m2!1sen!2sin"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default OurStore;
