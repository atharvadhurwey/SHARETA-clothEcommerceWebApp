import React from 'react';
import './CSS/Brands.css';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import brands from '../Components/Assets/brands';
import { Link } from 'react-router-dom';

const Brand = () => {
  function importAllImg(r) {
    let images = {};
    r.keys().map((item, index) => {
      return (images[item.replace('./', '')] = r(item));
    });
    return images;
  }
  const images = importAllImg(require.context('../Components/Assets/cloths/brandlogo', false, /\.(png|jpe?g|svg)$/));

  return brands.length > 0 && (
    <div>
      <Breadcrum crum={'HOME / SHOP '} name={'brands'} banner={'brands'} />

      <section className="brandlist-main-container">
        <div className="formen-container">
          <div className="formen-heading">
            <h1>Brands</h1>
          </div>
          <div className="card-container">
            {brands.map((brand, index) => {
              return (
                <div key={index} className="card-item">
                  <Link className="card-link" to={`/brands/${brand}`}>
                    <img src={images[`${brand}.png`]} alt="" className="card-img" />
                  </Link>
                  <div className="card-content">
                    <h1>{brand}</h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Brand;
