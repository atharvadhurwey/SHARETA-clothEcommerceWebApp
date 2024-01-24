import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import Breadcrum from '../Breadcrums/Breadcrum';
import { Link } from 'react-router-dom';

const CartItems = () => {
  const { all_product, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);
  return (
    all_product.length > 0 && (
      <>
        <Breadcrum crum={'HOME / SHOP '} name={'Cart items'} banner={'cart'} />

        <section className="shoppingCart-main-container" id="cartList">
          <h1 className="shoppingCart-main-container-heading">Products</h1>
          <div className="shoppingCart-productDetail-container">
            <div className="shoppingCart-product-container">
              <div className="shoppingCart-product-items">
                <div className="shoppingCart-product-container-line"></div>

                {getTotalCartAmount() === 0 ? (
                  <div className="shoppingCart-product-empty">
                    Your Cart is <span>EMPTY</span>
                  </div>
                ) : null}

                {all_product.map((e) => {
                  if (cartItems[e.id] > 0) {
                    return (
                      <div key={e.id}>
                        <div className="shoppingCart-product-item">
                          <div className="shoppingCart-product-image">
                            <img src={e.image} loading="lazy" alt="" />
                          </div>
                          <div className="shoppingCart-product-name">
                            <div>Name</div>
                            <div>{e.name}</div>
                          </div>
                          <div className="shoppingCart-product-quantity">
                            <div>Quantity</div>
                            <div className="shoppingCart-product-quantity-input">{cartItems[e.id]}</div>
                          </div>
                          <div className="shoppingCart-product-price">
                            <div>Price</div>
                            <div>${e.new_price * cartItems[e.id]}</div>
                          </div>
                          <div className="shoppingCart-product-delete">
                            <button
                              onClick={() => {
                                removeFromCart(e.id);
                              }}
                              className="delete-item"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 3h18v18H3zM15 9l-6 6m0-6l6 6" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="shoppingCart-product-container-line"></div>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>

            <div className="shoppingCart-productPrice-container">
              <div className="shoppingCart-productPrice-content">
                <h1 className="shoppingCart-productPrice-heading">Cart Total</h1>
                <div className="shoppingCart-productPrice-subtotal">
                  <h1>Subtotal:</h1>
                  <h1 className="shoppingCart-productPrice-price">${getTotalCartAmount()}</h1>
                </div>
                <h1 className="shoppingCart-productPrice-heading">Shipping:</h1>
                <h1 className="shoppingCart-productPrice-flatrate">Flat Rate: 10$</h1>
                <div className="shoppingCart-productPrice-total">
                  <h1 className="shoppingCart-productPrice-heading">Total:</h1>
                  <h1 className="shoppingCart-productPrice-price">${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 10}</h1>
                </div>
              </div>
              <div className="shoppingCart-productPrice-buttons">
                <Link>
                  <button className="btn-5">Proceed to check out</button>
                </Link>
                <Link to="/cloths">
                  <button className="btn-5">Continue Shopping</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="shoppingCart-discount-container">
            <h1>DISCOUNT</h1>
            <p>
              To apply your discount enter number of your coupon
              <br />
              and press "SUBMIT" button
            </p>
            <div>
              <input type="text" />
              <button type="button">Submit</button>
            </div>
          </div>
        </section>
      </>
    )
  );
};

export default CartItems;
