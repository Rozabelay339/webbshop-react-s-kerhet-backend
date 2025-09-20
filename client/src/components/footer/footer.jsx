import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Roza’s Shop | All rights reserved.</p>
      <p>
        Built with by <strong>Roza Belay</strong>
      </p>
    </footer>
  );
};

export default Footer;
