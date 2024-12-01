import React, { useEffect } from "react";
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
import leaf from "../../images/leaf.png";
const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  console.log(products);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

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
              <img src={homeBanner} alt="masparsha banner" />
            </section>

            {/* Verified By proofs */}

            <section className="proofContainer">
              <div className="proofData">
                <img className="proof-img" src={proof1} alt="maasparsh proof2" />
                <img className="proof-img" src={proof2} alt="maasparsa proof1" />
                <img className="proof-img" src={proof3} alt="maasparsh proof3" />
                <img className="proof-img" src={proof4} alt="maasparsh proof4" />
                <img className="proof-img" src={proof5} alt="maasparsh proof5" />
              </div>
              <div className="proofData">
                <h4>Tested</h4>
                <h4>Pure Aurvedic</h4>
                <h4>Chemical Free</h4>
                <h4>No Harm</h4>
                <h4>Make in India</h4>
              </div>
              <div className="proofData">
                <p>
                  Food and Drug Administration has certified all biological
                  formulations for our skin products and toys, assuring safety
                  and sustainability for the little ones.
                </p>
                <p>
                  Away from the chemicals, we have replaced every formulation
                  with plant- based articulations derived from golden
                  ingredients like veldt grape, Saffron, raktachandan, and many
                  more.{" "}
                </p>
                <p>
                  Food and Drug Administration has certified all biological
                  formulations for our skin products and toys, assuring safety
                  and sustainability for the little ones.
                </p>
                <p>
                  Food and Drug Administration has certified all biological
                  formulations for our skin products and toys, assuring safety
                  and sustainability for the little ones.
                </p>
                <p>
                  Every offering in our product line is derived from our
                  nature-enriched land, wholly inspired and derived in India.
                  The handpicked ingredients provide the finest care from mother
                  earth.{" "}
                </p>
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
                <img className="leaf3" src={leaf} alt="" />
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
            <div>
                <h2 className="product-container-titles quick sand-black">
                Featured usage
                </h2>
                <p className="product-container-title-des League-Spartan">
                   A demo representation of our product usage
                </p>
                <div className="product-container">
                  <img  src={feature1}  className="feature-img" alt="feature1" />
                  <img  src={feature2} className="feature-img" alt="feature2" />
                  <img  src={feature3} className="feature-img" alt="feature3" />
                  <img  src={feature4} className="feature-img" alt="feature4" />
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
