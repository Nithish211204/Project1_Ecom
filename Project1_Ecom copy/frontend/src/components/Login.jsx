
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // import the hook
import toast, { Toaster } from "react-hot-toast"; // Importing toast for notifications
import './Login.css';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth/signin", {
        email,
        password,
      });

      const { role, token } = response.data;

      localStorage.setItem("authToken", token); // Storing authToken in localStorage
      
      // Redirect based on user role
      if (role === "admin") {
        
        // navigate("/admin"); // Use navigate instead of window.location.href
        window.location.href = "/admin";
        toast.success("Admin logged in successfully!");
      } else if (role === "customer") {
        toast.success("Customer logged in successfully!");
        // navigate("/"); // Use navigate for customer
        window.location.href = "/";
      } else {
        toast.error("Unknown role.");
      }
    } catch (error) {
      // Handle login error and show error toast
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Sign In</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="input-container">
          <label htmlFor="email" className="input-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
            id="email"
          />
        </div>
        <div className="input-container">
          <label htmlFor="password" className="input-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
            id="password"
          />
        </div>
        <button type="submit" className="submit-btn">Login</button>
      </form>
      <Toaster /> 
    </div>
  );
};

export default Login;
