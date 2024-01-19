import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
// import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { all_product } = useContext(ShopContext);
  const product = all_product.find((e) => e.id === Number(productId));
  return (
    product && (
      <div>
        <Breadcrum crum={'HOME / SHOP / CLOTHS '} name={product.category} banner={'product'} />
        <section className="product-main-container">
          <ProductDisplay product={product} />
          <DescriptionBox category={product.category} type={product.type} description={product.description} />
        </section>
        {/* <RelatedProducts /> */}
      </div>
    )
  );
};

export default Product;
