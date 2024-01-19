import React, { useContext } from 'react';
import './CSS/Cloths.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Items/Item';
import Breadcrum from '../Components/Breadcrums/Breadcrum';

const Cloths = () => {
  const { all_product } = useContext(ShopContext);
  return (
    all_product.length > 0 && (
      <div>
        <Breadcrum crum={'HOME / SHOP '} name={'CLOTHS'} banner={'cloths'} />

        <section className="products-main-container">
          <div className="product-container" id="filteredProducts">
            {all_product.map((item, i) => {
              return <Item key={i} id={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price} type={item.type} brand={item.brand} />;
            })}
          </div>
        </section>
      </div>
    )
  );
};

export default Cloths;
