import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaSearch, FaUser, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // const toggleDropdown = () => {
  //   console.log("Dropdown clicked"); // Debugging to check if it's triggered
  //   setDropdownOpen(!dropdownOpen);
  // };

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

      {/* Search Bar */}
      <div className="navbar-search">
        <input type="text" placeholder="Search..." />
      </div>

      {/* Menu and Account Section */}
      <div className="search-account">
        {/* Navbar Menu */}
        <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/product">Products</Link>
        </div>

        {/* Account Dropdown */}
        {/* <div className="account-dropdown">
          <FaUser className="account-icon" onClick={toggleDropdown} />
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button>
                <Link to="/login">Login</Link>
              </button>
              <button>
                <Link to="/signup">Register</Link>
              </button>
            </div>
          )}
        </div> */}
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              b
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#"><Link to="/login">Login</Link></a></li>
              <li><a class="dropdown-item" href="#"><Link to="/signup">Register</Link></a></li>
            </ul>
        </div>
      </div>  
    </nav>
  );
};

export default Navbar;
