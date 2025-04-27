import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css"
import "./Home.css";

const ProductCard = ({ product }) => {
  // Check if the product has images and if the first and second images are available
  const firstImageUrl =
    product.images && product.images.length > 0
      ? product.images[0].url
      : "https://via.placeholder.com/150"; // Fallback image URL

  const secondImageUrl =
    product.images && product.images.length > 1
      ? product.images[1].url
      : firstImageUrl; // Use the first image as fallback if the second image is not available

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <div className="product-image-container">
        <img loading="lazy"
 src={firstImageUrl} alt={product.name} className="first-image" />
        <img loading="lazy"
 src={secondImageUrl} alt={product.name} className="second-image" />
      </div>
      <p>{product.name}</p>
      <div className="cart-btn-price">
        <span>{`₹${product.price}`}</span>
        <button className="cart-btn">Add to Cart</button>
      </div>
    </Link>
  );
};

export default ProductCard;