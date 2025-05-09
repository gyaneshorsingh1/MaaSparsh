import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";


const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img loading="lazy"
 src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}><DeleteIcon style={{ color: "#7A301B", cursor: "pointer", fontSize: "2.2vmax" }} /></p>
      </div>
    </div>
  );
};

export default CartItemCard;
