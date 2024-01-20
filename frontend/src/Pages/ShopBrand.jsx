import React from 'react';
import './CSS/ShopBrand.css';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Items/Item';
import Breadcrum from '../Components/Breadcrums/Breadcrum';

const ShopBrand = () => {
  const { brandName } = useParams();
  const { all_product } = useContext(ShopContext);

  // Filter products by brand name
  const filteredProducts = all_product.filter((product) => product.brand === brandName);

  return (
    filteredProducts.length > 0 && (
      <>
        <Breadcrum crum={'HOME / SHOP / BRAND'} name={brandName} banner={'brand'} />
        <div className="filteredProducts-main-container">
          <div className="product-container">
            {filteredProducts.map((item, i) => {
              return <Item key={i} id={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price} type={item.type} brand={item.brand} />;
            })}
          </div>
        </div>
      </>
    )
  );
};

export default ShopBrand;
