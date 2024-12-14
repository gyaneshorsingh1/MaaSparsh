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
import homeBanner from "../../images/homebanner.png";
import proof1 from "../../images/proof1.png";
import proof2 from "../../images/proof2.png";
import proof3 from "../../images/proof3.png";
import proof4 from "../../images/proof4.png";
import proof5 from "../../images/proof5.png";
import slideArrow from "../../images/arrow.png";
import feature1 from "../../images/feature1.png";
import feature2 from "../../images/feature2.png";
import feature3 from "../../images/feature3.png";
import feature4 from "../../images/feature4.png";
import leaf from "../../images/leaf-1.png";
import leaf2 from "../../images/leaf-2.png";
import babyimg from "../../images/baby-image.jpg"
import WhatsAppButton from "../layout/WhatsAppButton";
const Home = () => {
  const paragraphs = [
    "MaaSparsh offers Ayurvedic baby care with organic ingredients, ensuring natural and safe protection.",
    "We offer authentic Ayurvedic formulations crafted with organic ingredients, providing care and natural nourishment for your baby.",
    "Our products are paraben and sulphate-free, offering safe and toxic-free care for baby's sensitive skin.",
    "Maasparsh products are derma-safe, delivering gentle, skin-friendly care for your baby's delicate skin.",
    "Maasparsh products are handcrafted in India, embracing tradition and authenticity with every touch of care.",
  ];

  const [isMobile, setIsMobile] = useState(false);
  const [expandedStates, setExpandedStates] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);


  const slides = [homeBanner, babyimg, homeBanner];

  const [cur, setCur] = useState(0);

  const len = slides.length;

  const leftHandle = () => {
    setCur(cur - 1 < 0 ? len - 1 : cur - 1);
  };

  const rightHandle = useCallback(() => {
    setCur(cur + 1 > len - 1 ? 0 : cur + 1);
  }, [cur, len]);

  useEffect(() => {
    const interval = setTimeout(() => {
      rightHandle();
    }, 5000);
    return () => clearTimeout(interval);
  }, [rightHandle]);

  const toggleParagraph = (index) => {
    setExpandedStates((prevStates) =>
      prevStates.map((state, idx) => (idx === index ? !state : state))
    );
  };

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
      setIsMobile(window.innerWidth <= 500); // Set mobile breakpoint
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
              <FaArrowLeft className="leftBtn" onClick={leftHandle} />
              <FaArrowRight className="rightBtn" onClick={rightHandle} />

              {slides.map((slide, index) => {
                return (
                  <div key={index} className="banner-index" style={{
                    left: cur === index ? '0%' : cur < index ? '100%' : '-100%', // Position for the sliding effect
                  }}>
                    {cur === index && <img src={slide} alt="Slide" className="slideImage" />}
                  </div>
                );
              })}
            </section>

            {/* Verified By proofs */}

            <section className="proofContainer">
              <div className="proofData">
                <img
                  className="proof-img"
                  src={proof1}
                  alt="maasparsh proof2"
                />
                <img
                  className="proof-img"
                  src={proof2}
                  alt="maasparsa proof1"
                />
                <img
                  className="proof-img"
                  src={proof3}
                  alt="maasparsh proof3"
                />
                <img
                  className="proof-img"
                  src={proof4}
                  alt="maasparsh proof4"
                />
                <img
                  className="proof-img"
                  src={proof5}
                  alt="maasparsh proof5"
                />
              </div>
              <div className="proofData">
                <h4>Made with organic ingredients</h4>
                <h4>Pure Aurvedic Formulations</h4>
                <h4>Paraben and Sulphate free</h4>
                <h4>Derma Safe</h4>
                <h4>Handcrafted in India</h4>
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
                  <img className="leaf1" src={leaf} alt="" />
                  Best Sellers
                </h2>
                <p className="product-container-title-des League-Spartan">
                  Best of nature providing your baby goodness from skin to soul
                </p>
                <div className="product-container">
                  {products &&
                    products.map((product) => (
                      <ProductCard product={product} />
                    ))}

                  {products && products.length > 0 && (
                    <ProductCard product={products[0]} />
                  )}
                </div>
              </div>
              <div>
                <h2 className="product-container-titles quick sand-black">
                  <img className="leaf2" src={leaf} alt="" />
                  <img className="leaf3" src={leaf2} alt="" />
                  Gifting
                </h2>

                <p className="product-container-title-des League-Spartan">
                  A wonderful offers from mother nature to new comers
                </p>
                <div className="product-container">
                  {products &&
                    products.map((product) => (
                      <ProductCard product={product} />
                    ))}

                  {products && products.length > 0 && (
                    <ProductCard product={products[0]} />
                  )}
                </div>
              </div>
              <div>
                <h2 className="product-container-titles quick sand-black">
                  Our Exclusives
                  <img className="leaf4" src={leaf} alt="" />
                </h2>
                <p className="product-container-title-des League-Spartan">
                  Specially made for innocent minds
                </p>
                <div className="product-container">
                  {products &&
                    products.map((product) => (
                      <ProductCard product={product} />
                    ))}

                  {products && products.length > 0 && (
                    <ProductCard product={products[0]} />
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
                <img className="leaf5" src={leaf2} alt="" />
                <div className="product-container">
                  <img src={feature1} className="feature-img" alt="feature1" />
                  <img src={feature2} className="feature-img" alt="feature2" />
                  <img src={feature3} className="feature-img" alt="feature3" />
                  <img src={feature4} className="feature-img" alt="feature4" />
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
