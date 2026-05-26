import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaExternalLinkAlt, FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import "./Footer.css";

const portfolioUrl = "https://roza-belay-portfolio.netlify.app/";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-dream-lights" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, index) => (
          <span key={index}>{index % 2 === 0 ? <FaShoppingBag /> : <FaShoppingCart />}</span>
        ))}
      </div>
      <div className="footer-inner">
        <p className="footer-brand"><FaShoppingBag /> TopStyle</p>
        <p className="footer-copy">
          © {new Date().getFullYear()} React, Vite och CSS av Roza Belay.
        </p>
        <div className="footer-links">
          <a className="footer-link" href={portfolioUrl} target="_blank" rel="noreferrer">
            <FaExternalLinkAlt /> Portfolio
          </a>
          <Link className="footer-link" to="/contact">
            <FaEnvelope /> Kontakt
          </Link>
          <Link className="footer-link" to="/cart">
            <FaShoppingCart /> Cart
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
