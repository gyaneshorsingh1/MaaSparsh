import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import faqsData from "./faqsData.jsx";

import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Rating,
} from "@mui/material";

import arrowup from "../../images/faq-arrow.png";
import arrowdown from "../../images/faq-arrow2.png";

// import { clearErrors, getProduct } from "../../actions/productAction";

import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProductList from "../Home/ProductList.jsx";

import leaf from "../../images/leaf-2.png";

import proof1 from "../../images/proof1.png";
import proof2 from "../../images/proof2.png";
import proof3 from "../../images/proof3.png";
import proof4 from "../../images/proof4.png";
import proof5 from "../../images/proof5.png";

import Hibiscus from "../../images/hibiscus.png";
import Shikakai from "../../images/shikakai.jpg";
import Fenugreek from "../../images/fenugreekseed.jpg";
import Coconut from "../../images/coconutoil.png";
import Neem from "../../images/neem.jpg";

import AloeVera from "../../images/aloevera.png";
import Jasmine from "../../images/jasmine.jpg";
import SheaButter from "../../images/sheabutter.jpg";
import Watermelon from "../../images/watermelon.jpg";
import RedSandalwood from "../../images/red-sandalwood.jpg";

import WallnutOil from "../../images/wallnut-oil.jpg";
import NoniOil from "../../images/noni-oil.jpg";
import PomegranateOil from "../../images/pomigranate-oil.jpg";
import GreenGram from "../../images/green-gram.jpg";
import SafronExtract from "../../images/saffron-extracted.jpg";

import WhatsAppButton from "../layout/WhatsAppButton";
import { addToWishlist } from "../../actions/wishlistActions.jsx";

const productMapping = {
  1: "Baby Massage Oil",
  2: "Baby Body Wash",
  3: "Baby Shampoo",
};

const ProductDetails = () => {
  const { id } = useParams(); // Use React Router's useParams to get product ID
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const options = {
    size: "large",
    value: product?.ratings || 0,
    readOnly: true,
    precision: 0.5,
  };

  const totalrating = {
    value: 4.7,
    readOnly: true,
    precision: 0.5,
  };

  const productNameRoute = product.name || "Product Not Found";
  const handleNavigation = () => {
    const newPath = `/product/${product.name
      .replace(/\s+/g, "-")
      .toLowerCase()}`; // Convert product name to a URL-friendly format
    navigate(newPath);
  };

  const increaseQuantity = () => {
    if (product?.Stock <= quantity) return;
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Item Added To Cart");
  };

  const addToWishlistHandler = () => {
    dispatch(addToWishlist(product._id));
    toast.success("Item Added To Wishlist");
  }

  const submitReviewToggle = () => setOpen((prevOpen) => !prevOpen);

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));
    setOpen(false);
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Track the selected image index

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index); // Update the carousel to show the clicked thumbnail
  };
  const handlePrevious = () => {
    // Decrease the index, loop to the last image if at the first image
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    // Increase the index, loop to the first image if at the last image
    setSelectedImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const isMobile = window.innerWidth <= 600;


  const ProductsData = [
    {
      name: "Baby Shampoo",
      ingredients: [
        { name: "Hibiscus", image: Hibiscus },
        { name: "Shikakai", image: Shikakai },
        { name: "Fenugreek", image: Fenugreek },
        { name: "Coconut Oil", image: Coconut },
        { name: "Neem", image: Neem },
      ],
    },
    {
      name: "Baby Body Wash",
      ingredients: [
        { name: "Aloe Vera", image: AloeVera },
        { name: "Jasmine", image: Jasmine },
        { name: "Shea Butter", image: SheaButter },
        { name: "Watermelon", image: Watermelon },
        { name: "Red Sandalwood", image: RedSandalwood },
      ],
    },
    {
      name: "Baby Massage Oil",
      ingredients: [
        { name: "Wallnut Oil", image: WallnutOil },
        { name: "Noni Oil", image: NoniOil },
        { name: "Pomegranate Oil", image: PomegranateOil },
        { name: "Green Gram", image: GreenGram },
        { name: "Saffron Extract", image: SafronExtract },
      ],
    },
  ];


  const productIngredient = ProductsData.find((item) => item.name === product.name);


  

  const faqs = faqsData[product.name] || [];

  const [openFAQ, setOpenFAQ] = useState(null); // State to track which FAQ is open

  const toggleAnswer = (index) => {
    if (openFAQ === index) {
      setOpenFAQ(null); // Close the answer if the same question is clicked again
    } else {
      setOpenFAQ(index); // Open the selected answer
    }
  };
  const [expandedItem, setExpandedItem] = useState(null);

  const handleToggle = (itemId) => {
    setExpandedItem((prev) => (prev === itemId ? null : itemId));
  };


  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, reviewError, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product?.name || "Product"} -- ECOMMERCE`} />
          <p className="product-details-path">
            <span
              className="route-path-span"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              home
            </span>{" "}
            {">"}{" "}
            <span
              className="route-path-span"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/products")}
            >
              products
            </span>{" "}
            {">"} {productNameRoute}
          </p>
          <div className="ProductDetails">
            <img loading="lazy"
 src={leaf} alt="" className="leaf3" />
            <img loading="lazy"
 src={leaf} alt="" className="leaf4" />
            <div>
              {/* <Carousel className="carousel">
                {product?.images?.map((item, i) => (
                  <img loading="lazy"

                    className="CarouselImage"
                    key={i}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                  
                ))}
                <img loading="lazy"
 className="CarouselImage" src="/logo.png" alt="" />
              </Carousel> */}

              <Carousel
                className="carousel"
                navButtonsAlwaysVisible={true} // Always show buttons
                navButtonsProps={{
                  style: {
                    backgroundColor: "transparent",
                    color: "#7A301A",
                    borderRadius: "50%",
                    width: isMobile ? "12px" : "30px",
                    height: isMobile ? "12px" : "30px",
                    fontSize: isMobile ? "10px" : "30px", // Adjust size for mobile
                  },
                }}
                navButtonsWrapperProps={{
                  style: {
                    top: isMobile ? "calc(50% - 10px)" : "calc(50% - 20px)", // Adjust position for mobile
                    height: isMobile ? "10px" : "30px",
                  },
                }}
                
                PrevIcon={
                  <button id="button1" onClick={handlePrevious}>
                    {"<"}
                  </button>
                } // Add functionality to Prev button
                NextIcon={
                  <button id="button1" onClick={handleNext}>
                    {">"}
                  </button>
                } // Add functionality to Next button
              >
                <img loading="lazy"

                  className="CarouselImage"
                  src={
                    product?.images?.[selectedImageIndex]?.url || "Product Image Not Found"
                  }
                  alt={`Slide ${selectedImageIndex}`}
                />
              </Carousel>


              {/* Thumbnails Section */}
              <div className="thumbnail-container">
                {product?.images?.map((item, i) => (
                  <img loading="lazy"

                    key={i}
                    className={`thumbnail ${
                      i === selectedImageIndex ? "active" : ""
                    }`}
                    src={item.url}
                    alt={`Thumbnail ${i}`}
                    onClick={() => handleThumbnailClick(i)}
                  />
                ))}
              </div>
            </div>

            <div className="p-details-desc">
              <div className="detailsBlock-1">
                <h2>{product?.name}</h2>
                {/* <p>Product # {product?._id}</p> */}
                <Rating {...totalrating} className="custom-rating" />
              </div>
              {/* <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  ({product?.numOfReviews || 0} Reviews)
                </span>
              </div> */}
              <div className="detailsBlock-3">
                <h1>
                  {`₹${product?.price}`} <p>(MRP Inclusive of all Taxes)</p>
                </h1>

                <div className="detailsBlock-4">
                  <p>{product?.description}</p>
                </div>
                <div className="detailsBlock-3-1 ">
                  <div className="detailsBlock-3-1-1 quantity-container">
                    <button className="decrement" onClick={decreaseQuantity}>
                      -
                    </button>
                    <input type="number" readOnly value={quantity} />
                    <button className="increment" onClick={increaseQuantity}>
                      +
                    </button>
                  </div>
                  <button
                    className="addcart-btn"
                    disabled={product?.Stock < 1}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="addcart-btn wishlist-btn"
                    disabled={product?.Stock < 1}
                    onClick={addToWishlistHandler}
                  >
                    Add to WishList
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product?.Stock < 1 ? "redColor" : "greenColor"}>
                    {product?.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
                <div className="tested-icons">
                  <img loading="lazy"
 src={proof1} alt="" />
                  <img loading="lazy"
 src={proof2} alt="" />
                  <img loading="lazy"
 src={proof3} alt="" />
                  <img loading="lazy"
 src={proof4} alt="" />
                  <img loading="lazy"
 src={proof5} alt="" />
                </div>
              </div>
            </div>
          </div>

          <div className="about-product-details">
          <div className="about-product">
      <h3>About the Product</h3>
      {product.aboutProducts && product.aboutProducts.length > 0 ? (
         <ul>
         {product.aboutProducts.map((item) => (
           <li
             key={item._id}
             className={`about-product-item ${
               expandedItem === item._id ? "expanded" : ""
             }`}
           >
             <div className="item-header">
               <strong>{item.title}</strong>
               <button
                 onClick={() => handleToggle(item._id)}
                 className="toggle-btn"
               >
                 {expandedItem === item._id ? "-" : "+"}
               </button>
             </div>
             <p className="item-description">{item.description}</p>
           </li>
         ))}
       </ul>
      ) : (
        <p>No information available.</p>
      )}
    </div>
            <div className="product-in-details">
              <h3>Product Details</h3>

              {product.productDetails && product.productDetails.length > 0 ? (
                <ul>
                  {product.productDetails.map((item) => (
                    <li key={item._id}>
                      <strong>{item.title}:</strong> {item.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No additional details available.</p>
              )}
            </div>
          </div>

          {productIngredient ? (
            <div className="ingredients">
              {productIngredient.ingredients.map((ingredient, index) => (
                <div key={index}>
                  <img loading="lazy"
 src={ingredient.image} alt={ingredient.name} />
                </div>
              ))}
            </div>
          ) : (
            <p>Product not found</p>
          )}

          <div className="faq-container">
            <h2>FAQs</h2>
            <img loading="lazy"
 src={leaf} alt="" className="leaf" />
            <img loading="lazy"
 src={leaf} alt="" className="leaf2" />

            {faqs.length > 0 ? (
              <ul className="faq-list">
                {faqs.map((faq, index) => (
                  <li
                    key={index}
                    className="faq-item"
                    onClick={() => toggleAnswer(index)}
                  >
                    <div
                      className="faq-question"
                      // Handle question click
                    >
                      <strong>{faq.question}</strong>
                      <span className="faq-icons">
                        {openFAQ === index ? (
                          <img loading="lazy"

                            src={arrowdown}
                            style={{
                              width: "17.5px",
                              height: "12px",
                              marginTop: "11px",
                              marginRight: "-2px",
                            }}
                            alt="Arrow Down"
                          />
                        ) : (
                          <img loading="lazy"

                            src={arrowup}
                            style={{ width: "10px", marginTop: "6px" }}
                            alt="Arrow Up"
                          />
                        )}
                      </span>
                    </div>
                    {openFAQ === index && (
                      <p className="faq-answer">{faq.answer}</p>
                    )}{" "}
                    {/* Only show answer if this FAQ is open */}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No FAQs available for this product.</p>
            )}
          </div>

          {/* <div className="product-container">
                  {products &&
                    products.map((product) => (
                      <ProductCard product={product} />
                    ))}

                  {products && products.length > 0 && (
                    <ProductCard product={products[0]} />
                  )}
                </div> */}

          <h3 className="reviewsHeading">REVIEWS</h3>
          <div className="review-btn-div">
            <button onClick={submitReviewToggle} className="submitReview">
              Write Review
            </button>
          </div>
          <br />

          <Dialog open={open} onClose={submitReviewToggle}>
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                className="star-rating"
                onChange={(e) => setRating(e.target.value)}
                value={rating}
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product?.reviews?.length > 0 ? (
            <div className="reviews">
              {product.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}

          <h2 className="product-suggestions">You May Like More</h2>
          <div className="productList">
            {" "}
            <ProductList />
          </div>
          <WhatsAppButton />
        </>
      )}
    </>
  );
};

export default ProductDetails;
