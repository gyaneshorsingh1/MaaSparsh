// Import necessary dependencies
import React from 'react';
import { Link } from 'react-router-dom'; // For navigation
import { FaArrowLeft } from 'react-icons/fa'; // Left arrow icon from react-icons
import "./goback.css"
const GoBackButton = () => {
    return (
        <div className="go-back-button">
            {/* Link to the home route */}
            <Link to="/" className="back-link">
                <FaArrowLeft size={30} /> {/* Customize size as needed */}
               
            </Link>
        </div>
    );
};

export default GoBackButton;
