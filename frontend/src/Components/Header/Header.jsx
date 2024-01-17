import React, { useContext, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Header = () => {
  const [menu, setMenu] = useState('shop');
  const { getTotalCartItems } = useContext(ShopContext);

  // account div toggle
  function accountToggle(e) {
    const accountBtn = document.querySelector('#accountBtn-toggle');
    accountBtn.classList.toggle('active');
  }

  return (
    <header className="main-header">
      <div className="header-content">
        <div className="left">
          <Link to="/">Shareta.</Link>
        </div>
        <ul className="center" id="nav-menu">
          <div className="close_menu" id="close-menu">
            <i>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </i>
          </div>
          <li className="nav_item">
            <Link
              onClick={() => {
                setMenu('shop');
              }}
              className={menu === 'shop' ? 'nav_link menu-active' : 'nav_link'}
              to="/"
            >
              HOME
            </Link>
          </li>
          <li className="nav_item">
            <Link
              onClick={() => {
                setMenu('mens');
              }}
              className={menu === 'mens' ? 'nav_link menu-active' : 'nav_link'}
              to="/mens"
            >
              MEN
            </Link>
          </li>
          <li className="nav_item">
            <Link
              onClick={() => {
                setMenu('womens');
              }}
              className={menu === 'womens' ? 'nav_link menu-active' : 'nav_link'}
              to="/womens"
            >
              WOMEN
            </Link>
          </li>
          <li className="nav_item">
            <Link
              onClick={() => {
                setMenu('kids');
              }}
              className={menu === 'kids' ? 'nav_link menu-active' : 'nav_link'}
              to="/kids"
            >
              KID
            </Link>
          </li>
          {/* <li onClick={() => { setMenu('shop'); }} className="nav_item" >
            <Link className="nav_link" to="/">
              PRODUCTS
            </Link>
          </li>
          <li onClick={() => { setMenu('shop'); }} className="nav_item" >
            <Link className="nav_link" to="/">
              BRANDS
            </Link>
          </li>
          <li onClick={() => { setMenu('shop'); }} className="nav_item" >
            <Link className="nav_link" to="/">
              ABOUT US
            </Link>
          </li> */}
        </ul>
        <div className="right">
          <button style={{ display: 'inline' }} className="navbar-icon" id="searchToggle">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <button style={{ display: 'inline' }} className="navbar-icon" id="accountToggle" onClick={accountToggle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          <span className="cart-icon navbar-icon">
            <Link to="/cart">
              <button type="submit" id="mainBtn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="10" cy="20.5" r="1" />
                  <circle cx="18" cy="20.5" r="1" />
                  <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" />
                </svg>
                <span className="cart-count cart-list">{getTotalCartItems()}</span>
              </button>
            </Link>
          </span>

          {/* hidden account div */}
          <div className="header-accountBtn-toggle" id="accountBtn-toggle">
            <div className="accountbox-main-container">
              {localStorage.getItem('auth-token') ? (
                <div>
                  {/* <Link to="/">Dashboard</Link> */}
                  <div
                    className="link"
                    onClick={() => {
                      localStorage.removeItem('auth-token');
                      window.location.replace('/');
                    }}
                  >
                    Logout
                  </div>
                </div>
              ) : (
                <div>
                  <Link className="link" to="/login">
                    Login/Signup
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="toggle_menu" id="toggle-menu">
          <i>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </i>
        </div>
      </div>
      <div className="header-searchBtn-toggle" style={{ display: 'none' }} id="searchBtn-toggle">
        <div className="searchbox-main-container">
          <form className="searchbox-main-form" action="/search">
            <div className="searchbox-content">
              <input name="q" type="text" placeholder=" " />
              <button type="submit">
                <span className="searchbox-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
              </button>
              <span className="searchbox-search">search</span>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
