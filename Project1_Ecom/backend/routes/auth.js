const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Admin = require("../models/Admin");
dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
  const { phone, name, location } = req.body;

  // Validate required fields
  if (!phone || !name || !location) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the phone number already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({ phone, name, location });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/login", async (req, res) => {
  const { phone } = req.body;

  try {
    // First, check if the phone exists in the Admin collection
    let user = await Admin.findOne({ phone });
    let role;

    if (user) {
      // If found in Admin collection, set role to 'admin'
      role = "admin";
    } else {
      // If not found in Admin, check the User collection
      user = await User.findOne({ phone });
      role = "customer"; // Default role is 'customer' if found in User collection
    }

    if (!user) {
      // If not found in either collection, return isNewUser as true
      return res.status(200).json({ isNewUser: true });
    }

    // If user exists, generate a JWT token and return it with role
    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return res.json({ role, token, isNewUser: false });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;