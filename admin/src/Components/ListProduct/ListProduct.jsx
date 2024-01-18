import { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon2.png';

const BASE_URL = import.meta.env.VITE_PROTOCOL + import.meta.env.VITE_HOST_URL;

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch(`${BASE_URL}/allproducts`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id, image_id) => {
    await fetch(`${BASE_URL}/removeproduct`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        image_id: image_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    console.log('i was here');
    window.location.reload(false);
    await fetchInfo();
  };

  return allproducts.length > 0 ? (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="totalProducts">
        <p>Total Products: {allproducts.length}</p>
      </div>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => {
          return (
            <div key={index}>
              <div className="listproduct-format-main listproduct-format">
                <img className="listproduct-product-icon" src={product.image} alt="" />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img onClick={() => remove_product(product.id, product.image_id)} src={cross_icon} alt="" className="listproduct-remove-icon" />
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default ListProduct;
