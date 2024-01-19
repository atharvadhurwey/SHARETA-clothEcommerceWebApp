import React, { useEffect, useState } from 'react';
import './Popular.css';
import Item from '../Items/Item';

const BASE_URL = process.env.REACT_APP_PROTOCOL + process.env.REACT_APP_HOST_URL;

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/popularinwomen`)
      .then((response) => response.json())
      .then((data) => setPopularProducts(data));
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, i) => {
          return <Item key={i} id={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price} type={item.type} brand={item.brand} />;
        })}
      </div>
    </div>
  );
};

export default Popular;
