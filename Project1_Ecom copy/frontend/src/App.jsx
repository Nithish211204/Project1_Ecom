import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import Delete from './components/AdminProducts/ProductList';
import Add from './components/AdminProducts/AddProduct';
import Admin from './components/AdminProducts/AdminDashBoard';
import ProductPage from './components/ProductPage';
import Navbar_Customer from './components/Navbar_Customer';
import Cart from './components/Cart'; 
import Footer from './components/Footer';  

// import Update from './components/AdminProducts/UpdateProduct';
function App() {
  const token = localStorage.getItem("authToken");
  return (
    
    <Router>
      {(!token) ? <Navbar />: <Navbar_Customer /> }    
     
      <div>
        <Routes>
        {/* <Route path="/update" element={<Update/>}/> */}
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/product" element={<ProductPage/>}/>
        <Route path="/add" element={<Add/>}/>
          <Route path="/delete" element={<Delete/>}/>
        <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<SignUp />} />
         <Route path="/admin" element={<Admin/>}/>
          <Route path="/login" element={<Login />} />
          
        </Routes>
        </div>
      <Footer/>
    
     
    </Router>
  );
}

export default App;
