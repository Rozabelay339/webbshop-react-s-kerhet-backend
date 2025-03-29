import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; 
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <p>Top Shop</p>
      </div>
      <ul className="nav-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/order">Order</Link></li>
        <li><Link to="/checkout">Checkout</Link></li>
      </ul>
      <div className="nav-login-cart">
        <Link to="/cart">
          <FaShoppingCart className="nav-cart-icon" /> {/* Use the cart icon here */}
        </Link>
        <div className="nav-cart-count">3</div>
      </div>
    </nav>
  );
};

export default Navbar;
