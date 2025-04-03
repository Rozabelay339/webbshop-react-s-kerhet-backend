import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';
import './Navbar.css';
import shopIcon from '../../assets/shopIcon.jpg';

const Navbar = () => {
  const { cartItems } = useCart();

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={shopIcon} alt="Shop Icon" className="nav-shop-icon" />
      </div>
      <ul className="nav-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/checkout">Checkout</Link></li>
      </ul>
      <div className="nav-login-cart">
        <Link to="/cart">
          <FaShoppingCart className="nav-cart-icon" />
        </Link>
        <div className="nav-cart-count">{totalQuantity}</div>
      </div>
    </nav>
  );
};

export default Navbar;
