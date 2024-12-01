import React, { useState, Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Importing Font Awesome search icon
import searchicon from "../../images/searchicon.png";
const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const navigate = useNavigate();

  const placeholderOptions = [
    "Search a Product ...",
    "Find Your Favorite Item ...",
    "Discover New Products ...",
    "Shop the Best Deals ..."
  ];

  useEffect(() => {
    let optionIndex = 0;

    const cyclePlaceholders = () => {
      setCurrentPlaceholder(placeholderOptions[optionIndex]);
      optionIndex = (optionIndex + 1) % placeholderOptions.length; // Cycle through options
    };

    // Start cycling every 3 seconds
    const intervalId = setInterval(cyclePlaceholders, 2000);
    cyclePlaceholders(); // Immediately set the first placeholder

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  


  return (
    <Fragment>
      <MetaData title="Search A Product -- ECOMMERCE" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          className="search-input"
          placeholder={currentPlaceholder} 
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit" className="searchIcon">
          <img src={searchicon} alt="searchicon" className="Fasearch" />
        </button>
      </form>
    </Fragment>
  );
};

export default Search;
