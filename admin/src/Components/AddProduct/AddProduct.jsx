import { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const BASE_URL = import.meta.env.VITE_PROTOCOL + import.meta.env.VITE_HOST_URL;

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    image_id: '',
    category: 'women',
    brand: 'chicola',
    type: 'shirt',
    description: '',
    new_price: '',
    old_price: '',
  });

  // max file size is 2mb
  const maxFileSize = 2 * 1024 * 1024;
  const imageHandler = (e) => {
    const fileSize = e.target.files[0].size;
    if (fileSize > maxFileSize) {
      alert('file size is too large');
      return;
    }
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    const addProductBtn = document.querySelector('.addproduct-btn');
    addProductBtn.disabled = true;

    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    await fetch(`${BASE_URL}/upload/image`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      product.image = responseData.image_url;
      product.image_id = responseData.id;
      await fetch(`${BASE_URL}/addproduct`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert('Product Added') : alert('Failed');
        });
    }

    setProductDetails({
      name: '',
      image: '',
      image_id: '',
      category: 'women',
      brand: 'chicola',
      type: 'shirt',
      description: '',
      new_price: '',
      old_price: '',
    });

    addProductBtn.disabled = false;
  };

  const brands = ['chicola', 'clothculture', 'outfitvista', 'zyla'];
  const types = ['shirt', 'top', 'dress', 'jeans', 'hoodie', 'crop hoodie', 'jacket', 'sweater', 'sweatshirt', 't-shirt', 'long sleeves', 'polo', 'oversized', 'trouser', 'skirt', 'shorts', 'suit', 'coat', 'crop top'];

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Type Here" />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder="Type Here" />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder="Type Here" />
        </div>
      </div>
      <div className="allproduct-selectfields">
        <div className="addproduct-itemfield">
          <p>Product Category</p>
          <select value={productDetails.category} onChange={changeHandler} name="category" className="add-product-selector">
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
        </div>
        <div className="addproduct-itemfield">
          <p>Product Brand</p>
          <select value={productDetails.brand} onChange={changeHandler} name="brand" className="add-product-selector">
            {brands.map((brand, index) => {
              return (
                <option key={index} value={brand}>
                  {brand}
                </option>
              );
            })}
          </select>
        </div>
        <div className="addproduct-itemfield">
          <p>Product Type</p>
          <select value={productDetails.type} onChange={changeHandler} name="type" className="add-product-selector">
            {types.map((type, index) => {
              return (
                <option key={index} value={type}>
                  {type}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Description</p>
        <textarea value={productDetails.description} rows={10} cols={40} onChange={changeHandler} name="description" placeholder="Type Here" style={{ resize: 'none' }} />
      </div>
      <div className="addproduct-itemfield">
        <p>Product Image</p>
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : upload_area} className="addproduct-thumnail-img" alt="" />
        </label>
        <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
        <div className="addproduct-itemfield-alert">accepted file size is below 2mb</div>
      </div>
      <button
        onClick={() => {
          Add_Product();
        }}
        className="addproduct-btn"
      >
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
