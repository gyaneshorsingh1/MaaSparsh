import React, { useEffect, useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"; // Importing React Icons for the down and up arrows

import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
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

import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const faqsData = {
    "Baby Massage Oil": [
      {
        question: "What makes MaaSparsh Ayurvedic baby massage oil special?",
        answer:
          "MaaSparsh Ayurvedic baby massage oil is crafted with love and nature’s best herbs to nourish and protect your baby’s delicate skin.",
      },
      {
        question: "Is this oil safe for newborns?",
        answer:
          "Yes, MaaSparsh Ayurvedic baby massage oil is safe for newborns, as it is chemical-free and made with natural ingredients.",
      },
      // Add more questions here
    ],
    "Baby Shampoo": [
      {
        question: "What makes MaaSparsh Ayurvedic baby shampoo special?",
        answer:
          "MaaSparsh Ayurvedic baby shampoo is infused with natural and Ayurvedic ingredients to gently cleanse and nourish your baby's hair and scalp.",
      },
      {
        question: "Is MaaSparsh Ayurvedic baby shampoo safe for newborns?",
        answer:
          "Yes, MaaSparsh Ayurvedic baby shampoo is formulated with safe, natural ingredients, making it suitable for newborns.",
      },
      // Add more questions here
    ],
    "Baby Body Wash": [
      {
        question: "What makes MaaSparsh Ayurvedic baby body wash special?",
        answer:
          "MaaSparsh Ayurvedic baby body wash is enriched with natural herbs and gentle cleansers to provide a safe, soothing bath experience.",
      },
      {
        question:
          "Is MaaSparsh Ayurvedic baby body wash suitable for newborns?",
        answer:
          "Yes, MaaSparsh Ayurvedic baby body wash is safe and gentle for newborns’ sensitive skin.",
      },
      // Add more questions here
    ],
  };

  const { id } = useParams(); // Use React Router's useParams to get product ID
  const dispatch = useDispatch();

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

  const faqs = faqsData[product.name] || [];

  const [openFAQ, setOpenFAQ] = useState(null); // State to track which FAQ is open

  const toggleAnswer = (index) => {
    if (openFAQ === index) {
      setOpenFAQ(null); // Close the answer if the same question is clicked again
    } else {
      setOpenFAQ(index); // Open the selected answer
    }
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
          <div className="ProductDetails">
            <div>
              {/* <Carousel className="carousel">
                {product?.images?.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={i}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                  
                ))}
                <img className="CarouselImage" src="/logo.png" alt="" />
              </Carousel> */}

              <Carousel
                className="carousel "
                navButtonsAlwaysVisible={true} // Always show buttons
                navButtonsProps={{
                  style: {
                    backgroundColor: "#C95741B2", // Change button background color
                    color: "#fff", // Change icon color
                    borderRadius: "50%", // Make the button circular
                    fontSize: "20px",
                  },
                }}
                navButtonsWrapperProps={{
                  style: {
                    top: "calc(50% - 20px)", // Vertically center the buttons
                    height: "40px", // Optional: Adjust button container size
                  },
                }}
              >
                <img
                  className="CarouselImage"
                  src={
                    product?.images?.[selectedImageIndex]?.url || "/logo.png"
                  }
                  alt={`Slide ${selectedImageIndex}`}
                />
              </Carousel>

              {/* Thumbnails Section */}
              <div className="thumbnail-container">
                {product?.images?.map((item, i) => (
                  <img
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
                    className="addcart-btn"
                    disabled={product?.Stock < 1}
                    onClick={addToCartHandler}
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
              </div>
            </div>
          </div>

          <div className="about-product-details">
            <div className="about-product">
              <h3>About the Product</h3>
              {product.aboutProducts && product.aboutProducts.length > 0 ? (
                <ul>
                  {product.aboutProducts.map((item) => (
                    <li key={item._id}>
                      <strong>{item.title}:</strong> {item.description}
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



          <div className="faq-container">
            <h2>FAQs</h2>
            {faqs.length > 0 ? (
              <ul className="faq-list">
                {faqs.map((faq, index) => (
                  <li key={index} className="faq-item">
                    <div
                      className="faq-question"
                      onClick={() => toggleAnswer(index)} // Handle question click
                    >
                      <strong>{faq.question}</strong>
                      <span className="faq-icon">
                        {openFAQ === index ? (
                          <AiOutlineUp />
                        ) : (
                          <AiOutlineDown />
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

          <div className="review-btn-div">
            <button onClick={submitReviewToggle} className="submitReview">
              Write Review
            </button>
          </div>
          <br />

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog open={open} onClose={submitReviewToggle}>
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
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
        </>
      )}
    </>
  );
};

export default ProductDetails;
