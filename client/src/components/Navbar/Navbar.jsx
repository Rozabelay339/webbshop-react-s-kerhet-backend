import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import "./Navbar.css";
import shopIcon from "../../assets/shopIcon.jpg";

const Navbar = () => {
  const { cartItems } = useCart();
  const { user } = useAuth();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <img src={shopIcon} alt="TopStyle" />
      </Link>

      <ul className="nav-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/checkout">Checkout</Link></li>
        <li><Link to="/about">About</Link></li>
        <li>
          {user ? <Link to="/profile">Profile</Link> : <Link to="/login">Login</Link>}
        </li>
      </ul>

      <Link to="/cart" className="nav-cart">
        <FaShoppingCart />
        {totalItems > 0 && <span className="nav-cart-count">{totalItems}</span>}
      </Link>
    </nav>
  );
};

export default Navbar;
