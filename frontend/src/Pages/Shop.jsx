import React from 'react';
import Hero from '../Components/Hero/Hero';
import NewCollections from '../Components/NewCollections/NewCollections';
import ShopByCategory from '../Components/ShopByCategory/ShopByCategory';
import AboutUs from '../Components/AboutUs/AboutUs';
import WhatTheyThink from '../Components/WhatTheyThink/WhatTheyThink';
import CompanyLogo from '../Components/CompanyLogo/CompanyLogo';
// import NewsLetter from '../Components/NewsLetter/NewsLetter'
// import Offers from '../Components/Offers/Offers'
// import Popular from '../Components/Popular/Popular'

const Shop = () => {
  return (
    <div>
      <Hero />
      
      {/* black shape  */}
      <div className="shape"></div>

      <ShopByCategory />
      {/* <Popular /> */}
      <NewCollections />
      <AboutUs />

      {/* black shape  */}
      <div className="shape2container">
        <div className="shape2container-final">
          <div className="shape2"></div>
        </div>
      </div>
      
      <WhatTheyThink />
      <CompanyLogo />
      {/* <Offers />
      <NewsLetter /> */}
    </div>
  );
};

export default Shop;
