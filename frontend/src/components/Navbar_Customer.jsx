import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Search from './Search'
const Navbar_Customer = () => {
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        location.reload()
       
        
      };


  return (
    <nav className="navbar">
      <div className="logo">Legumes</div>
      <ul className="nav-links">
       <li><Search /></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/product">Products</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/"><button onClick={handleLogout}>Logout</button></Link></li>
      </ul>
      

    </nav>
    
  );
};

export default Navbar_Customer;
