import React, { createContext, useState } from 'react';
import { useQuery } from 'react-query';

const BASE_URL = process.env.REACT_APP_PROTOCOL + process.env.REACT_APP_HOST_URL;

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  useQuery('allproducts', () => {
    fetch(`${BASE_URL}/allproducts`)
      .then((res) => res.json())
      .then((data) => setAll_Product(data));

    if (localStorage.getItem('auth-token')) {
      fetch(`${BASE_URL}/getcart`, {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: '',
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data));

      fetch(`${BASE_URL}/getorders`, {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: '',
      })
        .then((response) => response.json())
        .then((data) => setPurchaseHistory(data));

      fetch(`${BASE_URL}/getuserdetails`, {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: '',
      })
        .then((response) => response.json())
        .then((data) => setUserDetails(data));
    }
  });

  // useEffect(() => {
  //   fetch(`${BASE_URL}/allproducts`)
  //     .then((response) => response.json())
  //     .then((data) => setAll_Product(data));

  //   if (localStorage.getItem('auth-token')) {
  //     fetch(`${BASE_URL}/getcart`, {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/form-data',
  //         'auth-token': `${localStorage.getItem('auth-token')}`,
  //         'Content-Type': 'application/json',
  //       },
  //       body: '',
  //     })
  //       .then((response) => response.json())
  //       .then((data) => setCartItems(data));
  //   }
  // }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem('auth-token')) {
      fetch(`${BASE_URL}/addtocart`, {
        method: 'POST',
        headers: {
          Accept: 'form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemId }),
      }).then((response) => response.json());
      // .then((data) => console.log(data));
    }
  };

  const addToPurchaseHistory = (item) => {
    if (localStorage.getItem('auth-token')) {
      fetch(`${BASE_URL}/addtopurchasehistory`, {
        method: 'POST',
        headers: {
          Accept: 'form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item: item }),
      }).then((response) => response.json());
      // .then((data) => console.log(data));
    }
  };

  const clearCart = (itemId) => {
    setCartItems(getDefaultCart());
    if (localStorage.getItem('auth-token')) {
      fetch(`${BASE_URL}/removeAllFromCart`, {
        method: 'POST',
        headers: {
          Accept: 'form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: 0 }),
      }).then((response) => response.json());
      // .then((data) => console.log(data));
    }
    // console.log(cartItems);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem('auth-token')) {
      fetch(`${BASE_URL}/removefromcart`, {
        method: 'POST',
        headers: {
          Accept: 'form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemId }),
      }).then((response) => response.json());
      // .then((data) => console.log(data));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }

    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  const contextValue = {
    all_product,
    cartItems,
    purchaseHistory,
    userDetails,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    clearCart,
    addToPurchaseHistory,
  };

  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
