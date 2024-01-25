import React, { useContext } from 'react';
// import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Items/Item';
import Breadcrum from '../Components/Breadcrums/Breadcrum';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  return (
    <>
      <div>
        <Breadcrum crum={'HOME / SHOP / CATEGORY'} name={props.category} banner={props.category} />

        <section className="products-main-container">
          <div className="product-container" id="filteredProducts">
            {all_product.map((item, i) => {
              if (props.category === item.category) {
                return <Item key={i} id={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price} type={item.type} brand={item.brand} />;
              } else {
                return null;
              }
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default ShopCategory;
