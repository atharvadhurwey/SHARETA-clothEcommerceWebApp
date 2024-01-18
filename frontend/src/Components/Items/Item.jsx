import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  return (
    <>
      {/* <div className="item">
        <Link to={`/product/${props.id}`}>
          <img onClick={window.scrollTo(0, 0)} src={props.image} alt="" />
        </Link>
        <p>{props.name}</p>
        <div className="item-prices">
          <div className="item-price-new">${props.new_price}</div>
          <div className="item-price-old">${props.old_price}</div>
        </div>
      </div> */}
      <div className="product">
        <div className="image">
          <Link to={`/product/${props.id}`}>
            <img src={props.image}  alt="" />
          </Link>
        </div>
        <div className="product-content">
          <h2 className="productCompany">Preetify</h2>
          <h2 className="productName">
            <Link>{props.name}</Link>
          </h2>
          <h3 className="productCategory">{props.category}</h3>
          <div className="product-content-price-align">
            <span className="product-content-price-align-symbol">$</span>
            <span className="productPrice">{props.new_price}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
