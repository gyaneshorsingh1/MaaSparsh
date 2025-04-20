import React from "react";

const ContactUs = () => {
  const handleClick = () => {
    window.location.href = "mailto:care@maasparsh.com";
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Click to send an email"
        onClick={handleClick}
        readOnly
        style={{ cursor: "pointer", width: "100%", borderRadius: "12px", padding:"10px", border:"1px solid black"  }}
        className="search-input"
      />
    </div>
  );
};

export default ContactUs;
