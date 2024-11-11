import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert"
import { clearErrors, getProduct } from '../../actions/productAction';
const categories = [
  "Products",
  "Bath Rituals",
  "Everyday Wellness",
  "Feeding Rituals",
  "Organic Clothing",
  "Baby Nursery",
];
const Navbar = () => {
    
  const dispatch = useDispatch();
  const alert = useAlert();
  const { products, loading, error } = useSelector((state) => state.products);
  const [category, setCategory] = useState("");

  console.log(products);
  const resetFilters = () => {
    setCategory("");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(category));
  }, [dispatch,category, error, alert]);
  const dynamicTitle = category ? `${category}` : "Products";
  return (
    <div>
      Navbar
      <ul className="categoryBox">
        {categories.map((category) => (
          <li
            className="category-link"
            key={category}
            onClick={() => {
              setCategory(category);
              if (category === "Products") {
                resetFilters(); // Reset all filters when "Products" category is selected
              }
            }}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
