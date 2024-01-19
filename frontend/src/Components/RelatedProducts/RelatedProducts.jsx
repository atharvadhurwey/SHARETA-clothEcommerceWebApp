import React from 'react';
import './RelatedProducts.css';
import data_product from '../Assets/data';
import Item from '../Items/Item';

const RelatedProducts = () => {
  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {data_product.map((item, i) => {
          return <Item key={i} id={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price} type={item.type} brand={item.brand} />;
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
