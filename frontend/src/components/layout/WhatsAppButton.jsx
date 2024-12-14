import React from "react";
import "./WhatsAppButton.css"; // For styling

const WhatsAppButton = () => {
  const phoneNumber = "918051757309"; // Replace with your phone number including country code
  const message = "Hello! I need some assistance."; // Replace with your default message

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="whatsapp-button" onClick={handleClick} title="Chat with us on WhatsApp">
      <span>Chat with us</span>
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
        alt="WhatsApp Icon"
      />
      
    </div>
  );
};

export default WhatsAppButton;
