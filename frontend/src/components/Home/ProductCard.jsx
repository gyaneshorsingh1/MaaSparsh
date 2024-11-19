import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // Check if the product has images and if the first image is available
  const imageUrl = product.images && product.images.length > 0 
    ? product.images[0].url 
    : "https://via.placeholder.com/150"; // Fallback image URL

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={imageUrl} alt={product.name} />
      <p>{product.name}</p>
      <span>{`₹${product.price}`}</span>
      <button className="cart-btn">Add to Cart</button>
    </Link>
  );
};

export default ProductCard;
