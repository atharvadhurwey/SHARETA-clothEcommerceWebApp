import React from 'react';
import './ShopByCategory.css';
import { Link } from 'react-router-dom';
import male_img from '../Assets/male.jpg';
import female_img from '../Assets/female.jpg';
import kid_img from '../Assets/kid.jpg';

const ShopByCategory = () => {
  return (
    <div>
      <div className="byCategory">
        <h1>SHOP BY CATEGORIES</h1>
        <p>Pick Link category you need</p>
      </div>
      <div className="card-container">
        <div className="card-item">
          <Link className="card-link" to="/mens">
            <img src={male_img} onClick={window.scrollTo(0, 0)} alt="" className="card-img" />
          </Link>
          <div className="card-content">
            <h1>MALE</h1>
          </div>
          <div className="card-hiddenText">
            <p>Men's Collection</p>
          </div>
        </div>
        <div className="card-item">
          <Link className="card-link" to="womens">
            <img src={female_img} onClick={window.scrollTo(0, 0)} alt="" className="card-img" />
          </Link>
          <div className="card-content">
            <h1>FEMALE</h1>
          </div>
          <div className="card-hiddenText">
            <p>Women's Collection</p>
          </div>
        </div>
        <div className="card-item">
          <Link className="card-link" to="/kids">
            <img src={kid_img} onClick={window.scrollTo(0, 0)} alt="" className="card-img" />
          </Link>
          <div className="card-content">
            <h1>KID</h1>
          </div>
          <div className="card-hiddenText">
            <p>Kid's Collection</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopByCategory;
