import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext'; 
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Product from './pages/Product';
import LoginPage from './pages/LoginPage';
import OrderPage from './pages/OrderPage';
import CheckoutPage from './pages/Checkout';
import Cart from './components/Cart/Cart';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ProductDetail from './pages/ProductDetail';
import './App.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Load your Stripe public key
const stripePromise = loadStripe('your-stripe-public-key');

function App() {
  return (
    <AuthProvider>
    <CartProvider>
      <Router>
        <Navbar />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Product />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route 
              path="/checkout" 
              element={
                <Elements stripe={stripePromise}>
                  <CheckoutPage />
                </Elements>
              } 
            />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </CartProvider>
  </AuthProvider>
  
  );
}

export default App;
