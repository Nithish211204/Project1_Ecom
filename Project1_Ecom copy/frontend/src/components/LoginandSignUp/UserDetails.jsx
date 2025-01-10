import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const UserDetails = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const phone = state?.phone; // Get phone number from state

  const handleSave = async () => {
    if (!name || !location) {
      alert("Name and Location are required.");
      return;
    }
  
    try {
      console.log({ phone, name, location });
      const response = await axios.post("http://localhost:8080/auth/register", { phone, name, location });
  
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token); // Store token in localStorage
        alert("Details saved successfully!");
        navigate("/"); // Redirect to home page
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save details. Please try again.");
    }
  };
  
  
  return (
    <div>
      <h2>Enter Your Details</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default UserDetails;
