const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const adddeleteRoutes=require('./routes/AddDelete');
const Product=require('./models/Product')
const Cart=require('./routes/cart')
const User = require('./models/User');
const Order=require('./routes/order')
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/auth', authRoutes);
app.use('/adddelete',adddeleteRoutes);
app.use('/orders',Order)
app.use('/cart',Cart);
app.get("/products",  async (req, res) => {
    try {
        // Fetch only available products from the database
        const products = await Product.find({ available: true });

        res.status(200).json(products); // Send back the filtered products
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error fetching products", error });
    }
});


const twilio = require('twilio');

// Twilio credentials
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN);

// app.use(bodyParser.json());

// Store OTPs with expiration times
// In-memory OTP storage
let otpStorage = {};

// Endpoint to send OTP
app.post('/send-otp', (req, res) => {
  const { phoneNumber } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  const expiryTime = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes

  otpStorage[phoneNumber] = { otp, expiryTime };

  client.messages.create({
      body: `Your verification code is: ${otp}`,
      from: 'whatsapp:+14155238886', // Twilio Sandbox number
      to: `whatsapp:+91${phoneNumber}`
  })
  .then(() => {
      res.status(200).json({ message: 'OTP sent successfully!' });
  })
  .catch(error => {
      console.error('Error sending OTP:', error);
      res.status(500).json({ error: 'Failed to send OTP' });
  });
});

// Endpoint to verify OTP
app.post('/verify-otp', (req, res) => {
    const { phoneno, otp } = req.body;
    const storedData = otpStorage[phoneno];

    if (!storedData) {
        return res.status(400).json({ error: 'OTP not sent or expired' });
    }

    const { otp: storedOtp, expiryTime } = storedData;

    if (Date.now() > expiryTime) {
        delete otpStorage[phoneno]; // Remove expired OTP
        return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
    }

    if (storedOtp == otp) {
        delete otpStorage[phoneno]; // Remove OTP after successful verification
        return res.status(200).json({ message: 'Phone number verified successfully!' });
    } else {
        return res.status(400).json({ error: 'Invalid OTP' });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
