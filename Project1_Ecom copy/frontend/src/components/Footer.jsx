import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">About Us</h3>
          <p className="footer-text">
            We provide the latest and most reliable electronics to simplify your life. Quality products, affordable prices, and exceptional support—everything you need in one place.
          </p>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/about" className="footer-link">About</a></li>
            <li><a href="/product" className="footer-link">Products</a></li>
            <li><a href="/contact" className="footer-link">Contact</a></li>
            <li><a href="/faq" className="footer-link">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">Stay Connected</h3>
          <div className="footer-social">
            <a href="#" className="footer-social-link">Instagram</a>
            <a href="#" className="footer-social-link">Facebook</a>
            <a href="#" className="footer-social-link">Twitter</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-bottom-text">© 2025 [Your Store Name]. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
