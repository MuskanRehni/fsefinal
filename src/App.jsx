import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import WomensSection from './pages/WomensSection';
import MensSection from './pages/MensSection';
import KidsSection from './pages/KidsSection';
import CategoryProducts from './pages/CategoryProducts';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/womens" element={<WomensSection />} />
            <Route path="/products/mens" element={<MensSection />} />
            <Route path="/products/children" element={<KidsSection />} />
            <Route path="/products/:section/:category" element={<CategoryProducts />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
