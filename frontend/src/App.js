import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer'
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'
import Header from './Components/Header/Header';
import FollowUs from './Components/FollowUs/FollowUs';
import { useLayoutEffect } from 'react';
import Cloths from './Pages/Cloths';
import About from './Pages/About';
// import Navbar from './Components/Navbar/Navbar';

function App() {
  // Scroll to top on route change
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div>
      {/* <Navbar /> */}
      <Header />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/mens' element={<ShopCategory banner={men_banner} category='men' />} />
        <Route path='/womens' element={<ShopCategory banner={women_banner} category='women' />} />
        <Route path='/kids' element={<ShopCategory banner={kid_banner} category='kid' />} />
        <Route path='/cloths' element={<Cloths />} />
        <Route path='/about' element={<About />} />
        <Route path='product' element={<Product />}>
          <Route path=':productId' element={<Product />} />
        </Route>
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<LoginSignup />} />
      </Routes>
      <FollowUs />
      <Footer />
    </div>
  );
}

export default App;
