import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
const MiniProduct = ({ product }) => {
  // Check if the product has images and if the first image is available
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].url
      : "https://via.placeholder.com/150"; // Fallback image URL

  return (
    <Link className="miniProductCard" to={`/product/${product._id}`}>
      <div>
        <img loading="lazy"
 src={imageUrl} alt={product.name} />
        <p>{product.name}</p>
        <span>{`₹${product.price}`}</span>
      </div>
      <div className="cart-btn-price">
        <button className="Mini-cart-btn">Add to Cart</button>
      </div>
    </Link>
  );
};

export default MiniProduct;
