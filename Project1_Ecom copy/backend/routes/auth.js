const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Admin = require("../models/Admin");
dotenv.config();

const router = express.Router();


router.post('/signup', async (req, res) => {
  const { phoneno,username, email, password,pincode} = req.body;
  
  try {
   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({phoneno, username, email, password,pincode });
    await newUser.save();

    res.status(201).json({ msg: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Admin.findOne({ email });
    let role = "admin";

    if (!user) {
      user = await User.findOne({ email });
      role = "customer";
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role },  process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ role, token ,user});
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});




module.exports = router;