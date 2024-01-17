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
      <ShopByCategory />
      {/* <Popular /> */}
      <NewCollections />
      <AboutUs />
      <WhatTheyThink />
      <CompanyLogo />
      {/* <Offers />
      <NewsLetter /> */}
    </div>
  );
};

export default Shop;
