import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaMoon, FaShoppingBag, FaShoppingCart, FaSun } from "react-icons/fa";
import { useCart } from "../../contexts/cartContextValue";
import { useAuth } from "../../contexts/authContextValue";
import "./Navbar.css";

const portfolioUrl = "https://roza-belay-portfolio.netlify.app/";

const Navbar = ({ theme, onToggleTheme }) => {
  const { cartItems } = useCart();
  const { user } = useAuth();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo" aria-label="TopStyle home">
        <span className="nav-logo-mark"><FaShoppingBag /></span>
        <span>
          <strong>TopStyle</strong>
          <small>React Webshop</small>
        </span>
      </Link>

      <ul className="nav-menu">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/products">Products</NavLink></li>
        <li><NavLink to="/checkout">Checkout</NavLink></li>
        <li><NavLink to="/about">Case</NavLink></li>
        <li><a href={portfolioUrl} target="_blank" rel="noreferrer">Portfolio</a></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        <li>
          {user ? <NavLink to="/profile">Profile</NavLink> : <NavLink to="/login">Login</NavLink>}
        </li>
      </ul>

      <div className="nav-actions">
        <Link to="/cart" className="nav-cart" aria-label="Open cart">
          <FaShoppingCart />
          {totalItems > 0 && <span className="nav-cart-count">{totalItems}</span>}
        </Link>

        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={theme === "dark" ? "Light mode" : "Dark mode"}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
