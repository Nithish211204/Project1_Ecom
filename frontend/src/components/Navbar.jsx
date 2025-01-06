import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Search from './Search'
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Legumes</div>
     <div className='search'><Search /></div> 
      <ul className="nav-links">
       {/* <li ><Search /></li> */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/product">Products</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/login">Signin</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
