import React from 'react';
import './AboutUs.css';
import aboutUs_img from '../Assets/cloths/aboutus2.jpg';

const AboutUs = () => {
  return (
    <div className="aboutUs">
      <div className="about-card">
        <div className="about-img">
          <img src={aboutUs_img} alt="" />
        </div>
        <div className="about-content">
          <h1>ABOUT SHARETA.</h1>
          <p>
            shopping with us is a great choice because we offer high-quality products, a wide range of products, competitive pricing, expert advice, convenient shopping, personalized service, and easy returns and
            exchanges. We are committed to providing our customers with an exceptional shopping experience, and we look forward to serving you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
