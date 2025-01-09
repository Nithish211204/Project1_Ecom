import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    phoneno: '',
    username: '',
    email: '',
    password: '',
    pincode: '',
  });

  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:8080/send-otp', {
        phoneNumber: formData.phoneno,
      });
      toast.success(response.data.message);
      setOtpSent(true);
      setTimer(120); // 2 minutes countdown
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error sending OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:8080/verify-otp', {
        phoneNumber: formData.phoneno,
        otp,
      });
      toast.success(response.data.message);
      setIsVerified(true);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Invalid OTP');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isVerified) {
      toast.error('Please verify your phone number first!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/auth/signup', formData);
      toast.success(response.data.msg);
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Error creating user');
    }
  };

  const resendOtp = () => {
    sendOtp();
  };

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneno"
            value={formData.phoneno}
            onChange={handleChange}
            required
          />
          {!otpSent && (
            <button type="button" onClick={sendOtp}>
              Send OTP
            </button>
          )}
        </div>
        {otpSent && !isVerified && (
          <div>
            <label>Enter OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button type="button" onClick={verifyOtp}>
              Verify OTP
            </button>
            {timer > 0 ? (
              <p>Time remaining to verify OTP: {formatTime()}</p>
            ) : (
              <button type="button" onClick={resendOtp}>
                Resend OTP
              </button>
            )}
          </div>
        )}
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Pincode:</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={!isVerified}>
          Signup
        </button>
      </form>
      <Toaster /> 
    </div>
  );
};

export default Signup;
