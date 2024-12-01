import React from "react";
import "./About.css";

import aboutBanner from "./aboutImages/about-banner.png";
import aboutfooterbanner from "./aboutImages/about-footer-banner.png";
import babyimage from "./aboutImages/baby-img.png";
import hearthand from "./aboutImages/heart-hand.png";
import babyfoot from "./aboutImages/baby-foot.png";

import downaboutbanner from "./aboutImages/down-about-banner.png";

import proof1 from "../../images/proof1.png";
import proof2 from "../../images/proof2.png";
import proof3 from "../../images/proof3.png";
import proof4 from "../../images/proof4.png";
import proof5 from "../../images/proof5.png";
import proof6 from "./aboutImages/hand-leaf.png";
import proof7 from "./aboutImages/peple-leaf.png";
import mixbanner from "./aboutImages/about-mix-banner.png";
import greenies from "./aboutImages/about-bannerlast.png";

const About = () => {
  return (
    <>
      <div className="about-container">
        <div className="about-banner">
          <img
            src={aboutBanner}
            className="about-banner-img"
            alt="about banner"
          />
          <h2>About Us</h2>
          <p>
            Cocooning your baby in the luxury of nature through holistically
            crafted formulations
          </p>
          <img src="/logo.png" alt=" maasparsh logo" className="about-logo" />
        </div>

        <div className="about-2">
          <h3>
            MaaSparsh crafts Ayurvedic baby care, blending purity with nature's
            essence.
          </h3>
          <p>
            MaaSparsh embodies the essence of nature by crafting Ayurvedic baby
            care products made from 100% natural and authentic ingredients,
            ensuring the purest touch for your baby's delicate skin.
          </p>
        </div>
        <div className="about-3">
          <img src={aboutfooterbanner} alt="about footer banner" />
        </div>

        <div className="about-4">
          <h2>Our Story</h2>
          <img src={babyimage} alt="baby image" />
          <div className="about-4-p">
            <p>
              At MaaSparsh, we embrace the timeless wisdom of Ayurveda to bring
              you the purest essence of nature. Rooted in the principles of
              balance and holistic well-being, our Ayurvedic baby massage oil is
              a harmonious blend of traditional ingredients, carefully crafted
              to nurture your little one with the goodness of nature.
            </p>
            <p>
              Guided by centuries-old Ayurvedic practices, MaaSparsh ensures
              that every product we create is a tribute to nature’s healing
              power. We believe in preserving the authenticity of ancient
              remedies while adapting them to meet modern needs.
            </p>
          </div>
        </div>
        <div className="about-sub-title">
          <h2>
            your baby's gentle touch deserves the care of nature's finest.
          </h2>
        </div>

        {/* <div className='our-mission-values'>
                <h2>Our Mission & Our Values</h2>
                <div className='our-mission-values-sec'>
                    <img src={hearthand} alt="heart-hand" className='grid-item item1'/>
                    <p className='grid-item item2'>At MaaSparsh, we promise purity in every drop, delivering Ayurvedic care rooted in the wisdom of age-old traditions. Our products are thoughtfully crafted using nature’s finest ingredients, ensuring a perfect balance for your baby’s wellness. From nurturing delicate skin to strengthening hair and supporting overall growth, we prioritize your baby’s holistic care. Each formulation is a testament to our commitment to quality and authenticity, offering gentle yet effective solutions. With MaaSparsh, embrace the goodness of Ayurveda for your little one’s healthy and happy journey.</p>
                    
                    <p className='girs-item item3'>MaaSparsh brings holistic wellness by embracing nature’s purest essence, lovingly crafted to nourish your baby. Rooted in Ayurvedic traditions, we source the finest ingredients directly from nature’s bounty to provide stability and care. Every product is designed to nurture your little one with the gentle touch of authenticity. From the hills to your home, MaaSparsh delivers the essence of nature for your baby’s wellness and happiness."</p>
                    <img src={babyfoot} alt="baby foot" className='grid-item item4' />
                </div>
            </div> */}

        <div className="about-6">
          <img src={downaboutbanner} alt="" />
        </div>

        <div className="about-7">
          <h2>Formulations</h2>
          <p>
            MaaSparsh draws from Mother Nature's treasure trove to craft
            wholesome wellness solutions for your baby. With eco-conscious
            practices like cold pressing, steam distillation, sedimentation, and
            natural filtration, we ensure every product retains its purity and
            potency. From soil to shelf, our formulations deliver nature’s
            luxurious essence in its most unadulterated form. We take pride in
            nurturing your baby with care that’s as gentle and authentic as
            nature itself
          </p>

          <div className="proofs">
            <div className="proof-icons">
              <img src={proof1} alt="proof1" />
              <img src={proof3} alt="proof3" />
              <img src={proof6} alt="proof6" />
              <img src={proof7} alt="proof7" />
              <img src={proof4} alt="proof4" />
              <img src={proof2} alt="proof2" />
              <img src={proof5} alt="proof5" />
            </div>
            <div className="proof-titles">
              <h4>Tested</h4>
              <h4>Chemical Free</h4>
              <h4>Organic</h4>
              <h4>Derma Safe</h4>
              <h4>No Hard</h4>
              <h4>Pure Aurvedic</h4>
              <h4>Make in India</h4>
            </div>
          </div>
          <div className="mix-banner">
            <img src={mixbanner} alt="mix banner" />
          </div>
          <div className="greenies-banner">
            <img src={greenies} alt="greenies banner" />
          </div>
        </div>
        <div className="about-footer-banner">
          <img src={aboutfooterbanner} alt=" about footer banner" />
        </div>
      </div>
    </>
  );
};

export default About;
