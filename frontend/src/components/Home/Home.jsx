import React, { useCallback, useEffect, useState } from "react";
import SlideItem from "./SlideItem.jsx";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify";
import mainBanner from "../../images/main-banner.jpg";
import mainBanner2 from "../../images/mainbanner2.jpg";
import banner2 from "../../images/banner2.jpg";
import banner3 from "../../images/banner3.jpg";
import banner4 from "../../images/banner4.jpg";
import proof1 from "../../images/proof1.png";
import proof2 from "../../images/proof2.png";
import proof3 from "../../images/proof3.png";
import proof4 from "../../images/proof4.png";
import proof5 from "../../images/proof5.png";
import feature1 from "../../images/feature1.png";
import feature2 from "../../images/feature2.png";
import feature3 from "../../images/feature3.png";
import feature4 from "../../images/feature4.png";
import leaf from "../../images/leaf-1.png";
import leaf2 from "../../images/leaf-2.png";
import WhatsAppButton from "../layout/WhatsAppButton";
import { Navigate, useNavigate } from "react-router-dom";
const Home = () => {
  const paragraphs = [
    "MaaSparsh products are dermatologically safe, ensuring gentle and irritation-free care for your baby's delicate skin.",
    "MaaSparsh products are sulphate-free, ensuring gentle cleansing without harming your baby’s delicate skin and hair.",
    "MaaSparsh products are 100% natural, made with pure, Ayurvedic ingredients for safe and gentle baby care.",
    "MaaSparsh products are paraben-free, providing safe and gentle care for your baby’s delicate skin.",
    "MaaSparsh products are vegan-friendly, crafted without any animal-derived ingredients for ethical and gentle care.",
  ];

  const [isMobile, setIsMobile] = useState(false);
  const [expandedStates, setExpandedStates] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const navigate = useNavigate();

  const slides = [mainBanner, mainBanner2, banner2, banner3, banner4];

  const [cur, setCur] = useState(0);

  const [direction, setDirection] = useState("right"); // Added direction state to track the slide direction

  const len = slides.length;

  const handleRadioClick = (index) => {
    if (index > cur) {
      setDirection("right");
    } else {
      setDirection("left");
    }
    setCur(index);
  };


  const leftHandle = () => {
    setCur(cur - 1 < 0 ? len - 1 : cur - 1);
  };

  const rightHandle = useCallback(() => {
    setCur(cur + 1 > len - 1 ? 0 : cur + 1);
  }, [cur, len]);



  const bannerLink = () => {
    navigate("/products")
  }

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900); // Set mobile breakpoint
    };

    // Check on mount and add listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="ECOMMERCE" />
          <div className="homedash">
            {/* <h2 className="homeHeading">Featured Products</h2> */}

            {/* Banner section */}
            <section className="homeBanner">
  {slides.map((slide, index) => (
    <div
      key={index}
      className="banner-index"
      style={{
        left: cur === index ? "0%" : cur < index ? "100%" : "-100%", // Position for the sliding effect
      }}
    >
      {cur === index && (
        <img loading="lazy"
 onClick={bannerLink}
          src={slide}
          alt={`Slide ${index + 1}`}
          className="slideImage"
        />
      )}
    </div>
  ))}

  {/* Left Arrow Button */}
  <div className="left-arrow" onClick={leftHandle}>
    <FaArrowLeft />
  </div>

  {/* Right Arrow Button */}
  <div className="right-arrow" onClick={rightHandle}>
    <FaArrowRight />
  </div>

  {/* Radio Buttons */}
  <div className="radioGroup">
    {slides.map((_, index) => (
      <span
        key={index}
        className={`radio ${cur === index ? "active" : ""}`}
        onClick={() => handleRadioClick(index)}
      ></span>
    ))}
  </div>
</section>


            {/* Verified By proofs */}

            <section className="proofContainer">
              <div className="proofData">
                <img loading="lazy"

                  className="proof-img"
                  src={proof1}
                  alt="maasparsh proof2"
                />
                <img loading="lazy"

                  className="proof-img"
                  src={proof2}
                  alt="maasparsa proof1"
                />
                <img loading="lazy"

                  className="proof-img"
                  src={proof3}
                  alt="maasparsh proof3"
                />
                <img loading="lazy"

                  className="proof-img"
                  src={proof4}
                  alt="maasparsh proof4"
                />
                <img loading="lazy"

                  className="proof-img"
                  src={proof5}
                  alt="maasparsh proof5"
                />
              </div>
              <div className="proofData">
                <h4>Dermatologically Safe</h4>
                <h4>Sulphate-Free Care</h4>
                <h4>100% Natural</h4>
                <h4>Paraben-Free</h4>
                <h4>Vegan-Friendly</h4>
              </div>
              <div className="proofData">
                {paragraphs.map((text, index) => (
                  <div key={index} className="paragraph-container">
                    <p>
                      {isMobile && !expandedStates[index]
                        ? `${text.slice(0, 50)}...`
                        : text}{" "}
                      {isMobile && (
                        <span
                          className="toggle-span"
                          onClick={() => toggleParagraph(index)}
                        >
                          {expandedStates[index] ? "Show Less" : "Show More"}
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Products */}
            <section className="product-containers">
              <div>
                <h2 className="product-container-titles quick sand-black">
                  <img loading="lazy"
 className="leaf1" src={leaf} alt="" />
                  Best Sellers
                </h2>
                <p className="product-container-title-des League-Spartan">
                  Best of nature providing your baby goodness from skin to soul
                </p>
                <div className="product-container">
                  {products &&
                    products.map((product) => (
                      <ProductCard product={product} key={product._id} />
                      
                    ))}
                    

                  {products && products.length > 0 && (
                    <ProductCard product={products[0]} key={products[0]._id} />
                    
                  )}
                </div>
              </div>
              <div>
                <h2 className="product-container-titles quick sand-black">
                  <img loading="lazy"
 className="leaf2" src={leaf} alt="" />
                  <img loading="lazy"
 className="leaf3" src={leaf2} alt="" />
                  Gifting
                </h2>

                <p className="product-container-title-des League-Spartan">
                  A wonderful offers from mother nature to new comers
                </p>
                <div className="product-container">
                  {products &&
                    products.map((product) => (
                      <ProductCard product={product} key={product._id} />
                    ))}

                  {products && products.length > 0 && (
                    <ProductCard product={products[0]} key={products[0]._id}  />
                  )}
                </div>
              </div>
              <div>
                <h2 className="product-container-titles quick sand-black">
                  Our Exclusives
                  <img loading="lazy"
 className="leaf4" src={leaf} alt="" />
                </h2>
                <p className="product-container-title-des League-Spartan">
                  Specially made for innocent minds
                </p>
                <div className="product-container">
                  {products &&
                    products.map((product) => (
                      <ProductCard product={product} key={product._id}/>
                    ))}

                  {products && products.length > 0 && (
                    <ProductCard product={products[0]} key={products[0]._id} />
                  )}
                </div>
              </div>
            </section>
            <section>
              <div className="feature-section">
                <h2 className="product-container-titles quick sand-black">
                  Featured usage
                </h2>
                <p className="product-container-title-des League-Spartan">
                  A demo representation of our product usage
                </p>
                <img loading="lazy"
 className="leaf5" src={leaf2} alt="" />
                <div className="product-container">
                  <img loading="lazy"
 src={feature1} className="feature-img" alt="feature1" />
                  <img loading="lazy"
 src={feature2} className="feature-img" alt="feature2" />
                  <img loading="lazy"
 src={feature3} className="feature-img" alt="feature3" />
                  <img loading="lazy"
 src={feature4} className="feature-img" alt="feature4" />
                </div>
              </div>
            </section>
          </div>
          <WhatsAppButton />
        </>
      )}
    </>
  );
};

export default Home;
