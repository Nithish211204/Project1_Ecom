
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify

const Login = () => {

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth/login", { phone });
      const { token, role, isNewUser } = response.data;

      if (isNewUser) {
        // Redirect to name and location page
        navigate("/details", { state: { phone } });
      } else {
        // Save token and redirect to home
        localStorage.setItem("authToken", token);
        if (role === "admin") {
          toast.success("Admin logged in successfully!");
          window.location.href = "/admin";
          navigate("/admin");
        } else if (role === "customer") {
          toast.success("Customer logged in successfully!");
          navigate( "/");
        }else if (role === "vendor") {
          toast.success("Vendor logged in successfully!");
          navigate( "/aorder");
        }  else {
          toast.error("Unknown role.");
        }
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button className="login-btn" type="submit">Login</button>
      </form>

      <ToastContainer /> {/* Add ToastContainer to render the toast notifications */}
    </div>
  );
};

export default Login;
