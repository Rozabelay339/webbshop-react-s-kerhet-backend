import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-hero">
        <h1 className="home-title">Welcome to Roza’s TopStyle</h1>
        <p className="home-subtitle">
          Discover the latest fashion trends, shoes, and accessories.  
          Quality products at the best prices.
        </p>
        <Link to="/products" className="home-btn">
          🛍️ Shop Now
        </Link>
      </div>
    </div>
  );
};

export default Home;
