import React, { useContext } from 'react';
import './ProductDisplay.css';
// import star_icon from '../Assets/star_icon.png';
// import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
// import { Link } from 'react-router-dom';

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  return (
    <>
      {/* <div className="productdisplay">
        <div className="productdisplay-left">
          <div className="productdisplay-img-list">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
          </div>
          <div className="productdisplay-img">
            <img className="productdisplay-main-img" src={product.image} alt="" />
          </div>
        </div>
        <div className="productdisplay-right">
          <h1>{product.name}</h1>
          <div className="productdisplay-right-star">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>(122)</p>
          </div>
          <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-old">${product.old_price}</div>
            <div className="productdisplay-right-price-new">${product.new_price}</div>
          </div>
          <div className="productdisplay-right-description">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt repellendus molestias eum ipsum laborum exercitationem, ut modi illum repudiandae eius, repellat earum corrupti nam distinctio veritatis? Quidem
            blanditiis mollitia at? Earum ea quia voluptates dolores?
          </div>
          <div className="productdisplay-right-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-sizes">
              <div>S</div>
              <div>M</div>
              <div>L</div>
              <div>XL</div>
              <div>XXL</div>
            </div>
          </div>
          <button
            onClick={() => {
              addToCart(product.id);
            }}
          >
            ADD TO CART
          </button>
          <p className="productdisplay-right-category">
            <span>Category :</span>Women , T-Shirt, Crop Top
          </p>
          <p className="productdisplay-right-category">
            <span>Tags :</span>Modern, Latest
          </p>
        </div>
      </div> */}

      <div className="product-detail-container">
        <div className="product-detail">
          <div className="product-brand">{product.brand}</div>
          <div className="product-name">{product.name}</div>
          <div className="product-type">{product.category}</div>
          <div className="product-type">{product.type}</div>
          {/* <div className="product-summary">THIS is good Dress</div> */}
          <div className="product-selectSize">
            <h1>SIZE</h1>
            <form className="product-selectSize-form" action="">
              <div className="product-selectSize-items">
                <input label="S" type="radio" name="product-size" className="product-size" defaultChecked />
                <input label="M" type="radio" name="product-size" className="product-size" />
                <input label="L" type="radio" name="product-size" className="product-size" />
              </div>
              <div className="product-price">
                <h1 className="product-price-symbol">$</h1>
                <h1 className="product-price-money">{product.new_price}</h1>
              </div>
              <button
                onClick={() => {
                  addToCart(product.id);
                  alert('Item Added to Cart');
                }}
                className="btn-5 add-to-cart"
                type="button"
                id="AddToCartBtn"
              >
                Add to Cart
              </button>
            </form>
          </div>
        </div>
        <div className="product-image">
          <img src={product.image} alt="PRODUCT_IMAGE" />
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;
