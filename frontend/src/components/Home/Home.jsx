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
const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

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
                <img src={proof2} alt="masparsha proof" />
                <p>
                  Food and Drug Administration has certified all biological
                  formulations for our skin products and toys, assuring safety
                  and sustainability for the little ones.
                </p>
              </div>
              <div className="proofData">
                <img src={proof1} alt="masparsha proof" />
                <p>
                  Away from the chemicals, we have replaced every formulation
                  with plant- based articulations derived from golden
                  ingredients like veldt grape, Saffron, raktachandan, and many
                  more.{" "}
                </p>
              </div>
              <div className="proofData">
                <img src={proof5} alt="masparsha proof" />
                <p>
                  Food and Drug Administration has certified all biological
                  formulations for our skin products and toys, assuring safety
                  and sustainability for the little ones.
                </p>
              </div>
              <div className="proofData">
                <img src={proof3} alt="masparsha proof" />
                <p>
                  Food and Drug Administration has certified all biological
                  formulations for our skin products and toys, assuring safety
                  and sustainability for the little ones.
                </p>
              </div>
              <div className="proofData">
                <img src={proof4} alt="masparsha proof" />
                <p>
                  Every offering in our product line is derived from our
                  nature-enriched land, wholly inspired and derived in India.
                  The handpicked ingredients provide the finest care from mother
                  earth.{" "}
                </p>
              </div>
            </section>

            {/* Products */}
            <section className="product-container" id="container">
              {products &&
                products.map((product) => <ProductCard product={product} />)}
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
