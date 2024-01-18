import React, { useState } from 'react';
import './NewCollections.css';
import Item from '../Items/Item';
import { useQuery } from 'react-query';

const BASE_URL = process.env.REACT_APP_PROTOCOL + process.env.REACT_APP_HOST_URL;

const NewCollections = () => {
  const [new_collection, setNew_collection] = useState([]);

  useQuery('newcollections', () =>
    fetch(`${BASE_URL}/newcollections`)
      .then((res) => res.json())
      .then((data) => setNew_collection(data))
  );

  return (
    new_collection.length > 0 && (
      <div>
        <div className="ourProducts">
          <h1>NEW COLLECTIONS</h1>
        </div>
        <div className="product-container">
          {new_collection.map((item, i) => {
            return <Item key={i} id={item.id} image={item.image} name={item.name} category={item.category} new_price={item.new_price} old_price={item.old_price} />;
          })}
        </div>
        {/* <div className="new-collections">
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
          {new_collection.map((item, i) => {
            return <Item key={i} id={item.id} image={item.image} name={item.name} category={item.category} new_price={item.new_price} old_price={item.old_price} />;
          })}
        </div>
      </div> */}
      </div>
    )
  );
};

export default NewCollections;
