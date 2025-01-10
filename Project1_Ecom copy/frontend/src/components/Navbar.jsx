import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">Legumes</div>

        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button className="search-btn">🔍</button>
        </div>

        {/* Menu Items */}
        <div className={`menu ${isMenuOpen ? "open" : ""}`}>
          <ul className="menu-items">
            <li>Home</li>
            <li>About</li>
            <li>Products</li>
          </ul>
          <div className="auth-buttons">
            <button className="login-btn">Login</button>
            <button className="register-btn">Register</button>
          </div>
        </div>

        {/* Hamburger Icon */}
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
