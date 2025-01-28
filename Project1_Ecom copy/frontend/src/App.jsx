import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginDetails from "./components/LoginandSignUp/UserDetails";
import Login from './components/LoginandSignUp/Login';
import Home from './components/HomePage/Home';
import Delete from './components/AdminProducts/ProductList';
import Vendor from './components/AdminProducts/Vendors';
import Add from './components/AdminProducts/AddProduct';
import Admin from './components/AdminProducts/AdminDashBoard';
import AOders from './components/AdminProducts/AdminOrder';
import ProductPage from './components/ProductPage';
import Navbar_Customer from './components/Navbar_Customer';
import Cart from './components/Cart'; 
import Footer from './components/Footer';  
import Order from './components/Order';
import AllOrder from './components/AllOrders';


// import Update from './components/AdminProducts/UpdateProduct';
function App() {
  const token = localStorage.getItem("authToken");
  return (
    
    <Router>
      {(!token) ? <Navbar />: <Navbar_Customer /> }    
     
      <div>
        
        <Routes>
        <Route path="/allorder" element={<AllOrder/>}/>
        <Route path="/order" element={<Order/>}/>
        <Route path="/aorder" element={<AOders/>}/>
        <Route path="/vendor" element={<Vendor/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/details" element={ <LoginDetails /> } />
        <Route path="/product" element={<ProductPage/>}/>
        <Route path="/add" element={<Add/>}/>
          <Route path="/delete" element={<Delete/>}/>
        <Route path="/" element={<Home/>} />
          {/* <Route path="/signup" element={<SignUp />} /> */}
         <Route path="/admin" element={<Admin/>}/>
          <Route path="/login" element={<Login />} />
          
        </Routes>
        </div>
      <Footer/>
    
     
    </Router>
  );
}

export default App;
