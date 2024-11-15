import React, { useRef, useEffect } from 'react';
import "./About.css";
import aboutBanner from "../../images/banner1.jpg"
const About = () => {

  const videoRef = useRef(null); // Create a ref to the video element

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.9; // Set initial playback speed to 0.5x (slow)
    }
  }, []);
  return (
    <>
      <div className="about-container">
        <div className="welcome">
            <img  className="main-section-img" src={aboutBanner}/>
            <div className="welcome-text">
              <h2>About Us</h2>
                <p>Welcome to Maasparash Essence of Ayurveda! We’re delighted to have you here.</p>
                <p>Don't miss out! Experience the power of Ayurveda with Maasparash Essence today!</p>
                <button className="about-btn">Purchase Now</button>
            </div>
        </div>


        <div className="about">
        
             <p><b>
             At MaaSparsh, we bring nature’s finest to your child, using only ingredients that are as pure <br/> and nurturing as a mother’s love.</b>
             </p>
             <p>Rooted in the heritage of Ayurveda, our products are designed to protect, soothe, and nourish, <br/> providing a natural start to a healthy life.</p>
          
        </div>

        <div className="our-story">
        <h2>Our Story</h2>
            <div className="story-des">
            
            <p>
                <li className="li-story">At <b>Maasparash Essence of Ayurveda</b>, we believe that the purest care begins at birth. Our story is rooted in the timeless wisdom of Ayurveda, India’s ancient system of holistic healing, combined with the latest scientific advancements to provide babies with the gentle care they deserve.</li>
                <li className="li-story"><b>How can we bring the ancient knowledge of Ayurveda into the modern world to nurture the most delicate beings—babies?</b> In our search for the answer, we recognized that nature holds the secrets to nurturing life in the purest form. With this realization, *Maasparash* was born—a brand that fuses centuries-old Ayurvedic knowledge with today’s modern safety standards to deliver a line of baby care products that parents can trust, crafted with love and precision.
                </li>
                <li className="li-story">Our name, <b>Maasparash</b>, means "the touch of a mother" because we understand that nothing is as pure, gentle, and nurturing as a mother’s love. Just like a mother’s tender touch, we are committed to ensuring that every ingredient that goes into our products is thoughtfully selected, ethically sourced, and tailored to nourish your baby’s skin and hair with the utmost care.</li>
            </p>
            </div>

        </div>

        <div className="braker-for-div1"></div>
        <div className="our-mission">
          <h2>Our Mission</h2>
          <p>
          <ul className="ul-about">
            <li className="li-about">
              Our mission is to create a nurturing environment for babies
              through thoughtfully designed products that prioritize safety,
              comfort, and style.
            </li>
            <li className="li-about">
              We aim to empower parents with the knowledge and products they
              need to care for their little ones.
            </li>
            </ul>
          </p>
        </div>


        <div className="braker-for-div"></div>

        <div className="our-promises">
          <h2>Maasparash Essence of Ayurveda promises you:</h2>
          <p>
            <ul className="ul-about">
            <li className="li-about"><b>Pure, Ayurvedic Formulations</b>: Made with natural, toxin-free
            ingredients.</li> <br/>
            <li className="li-about"><b>Gentle on Baby’s Skin</b>: Suitable for even the most
            sensitive skin types.</li><br/>
            <li className="li-about"><b>Sustainably Sourced</b>: Ethical and safe for
            both your baby and the environment. Trust Maasparash to provide a
            soothing and holistic care experience for your baby. With our
            commitment to quality and nature, we ensure that every drop of our
            product reflects the essence of Ayurveda, caring for your baby just
            the way nature intended.</li>
            </ul>
          </p>
        </div>

      </div>
    </>
  );
};

export default About;
