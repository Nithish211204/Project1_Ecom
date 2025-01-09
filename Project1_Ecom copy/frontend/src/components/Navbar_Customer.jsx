import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaSearch, FaUser, FaBars, FaTimes } from "react-icons/fa";

const Navbar_Customer = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    location.reload()
  };

  // Toggle the dropdown for account options
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Toggle the mobile menu visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Legumes</div>

      {/* Mobile Hamburger Menu */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Search Bar (Visible in Desktop and Mobile) */}
      <div className="navbar-search">
        <input type="text" placeholder="Search..." />
        {/* <FaSearch className="search-icon" /> */}
      </div>

      
      {/* </div> */}


      {/* Navbar Menu for Desktop */}
      <div className="search-account">
      <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/product">Products</Link>
      </div>

        {/* Account Dropdown */}
      <div className="account-dropdown">
         
              <button onClick={handleLogout}><Link to="/">Logout</Link></button>
          
         
        </div>
        </div>
    </nav>
  );
};

export default Navbar_Customer;






