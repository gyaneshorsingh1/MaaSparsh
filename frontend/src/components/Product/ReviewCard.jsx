import React from "react";
import { Rating } from '@mui/material';
import profilePng from "../../images/Profile.png";
const ReviewCard = ({ review }) => {
    const options ={
        size: "small",
        value: review.rating,
        readOnly: true,
        precision: 0.5,
      }

    return (
    <div className="reviewCard">
      <div className="reviewCard-img-name">
        <img src={profilePng} alt="User" />
        <p>{review.name}</p>
      </div>
        
        <Rating {...options} />
        <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
