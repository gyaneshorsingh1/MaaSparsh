import React from "react";
import { Rating } from '@mui/material';
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
    const options ={
        value: review.rating,
        readOnly: true,
        precision: 0.5,
      }

    return (
    <div className="reviewCard">
      <div className="reviewCard-img-name">
        <img loading="lazy"
 src={profilePng} alt="User" />
        <p>{review.name}</p>
      </div>
        
        <Rating {...options} className="star-rating" />
        <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
