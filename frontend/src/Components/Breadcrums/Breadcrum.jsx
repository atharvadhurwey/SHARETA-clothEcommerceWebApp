import React from 'react';
import './Breadcrum.css';
// import arrow_icon from '../Assets/breadcrum_arrow.png';

const Breadcrum = (props) => {
  return (
    <>
      {/* <div className="breadcrum">
        HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name}
      </div> */}
      <section className={`upperBanner-container upperBanner-${props.banner}`}>
        <div className="upperBanner-color"></div>
        <div className="upperBanner-content">
          <p>{props.crum}</p>
          <h1>{props.name}</h1>
        </div>
      </section>
    </>
  );
};

export default Breadcrum;
