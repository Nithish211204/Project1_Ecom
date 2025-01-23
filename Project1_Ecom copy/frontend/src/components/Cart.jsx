import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  // Fetch Cart Items
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response.data || []);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching cart');
    }
  };

  // Update Quantity (Increase/Decrease)
  const updateQuantity = async (productId, action) => {
    try {
      const endpoint =
        action === 'increase'
          ? `http://localhost:8080/cart/increase/${productId}`
          : `http://localhost:8080/cart/decrease/${productId}`;

      const response = await axios.post(endpoint, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: response.data.updatedQuantity }
            : item
        )
      );
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating quantity');
    }
  };

  // Remove Item from Cart
  const removeItemFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCartItems((prevItems) =>
        prevItems.filter((item) => item.productId !== productId)
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Error removing item');
    }
  };const handleCheckout = async () => {
    if (!selectedPaymentMethod) {
      toast.error('Please select a payment method');
      return;
    }
  
    try {
      const payload = {
        items: cartItems.map((item) => ({
          product: {
            _id: item.productId,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
          },
        })),
        paymentMethod: selectedPaymentMethod,
      };
  
      // Place the order
      const response = await axios.post(
        'http://localhost:8080/orders/add',
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      toast.success('Order placed successfully!');
  
      // Clear the cart after successful order
      await axios.delete('http://localhost:8080/cart/clear', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setCartItems([]); // Update the cart state
      setShowPaymentModal(false);
      // navigate('/orders'); // Redirect to orders page if needed
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order.');
    }
  };
  

  // // Place Order
  // const handleCheckout = async () => {
  //   if (!selectedPaymentMethod) {
  //     toast.error('Please select a payment method');
  //     return;
  //   }

  //   try {
  //     const payload = {
  //       items: cartItems.map((item) => ({
  //         product: {
  //           _id: item.productId,
  //           name: item.name,
  //           image: item.image,
  //           price: item.price,
  //           quantity: item.quantity,
  //         },
  //       })),
  //       paymentMethod: selectedPaymentMethod,
  //     };

  //     const response = await axios.post(
  //       'http://localhost:8080/orders/add',
  //       payload,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     toast.success('Order placed successfully!');
  //     setCartItems([]); // Clear the cart after successful order
  //     setShowPaymentModal(false);
  //     // navigate('/orders'); // Redirect to orders page if needed
  //   } catch (error) {
  //     console.error('Error placing order:', error);
  //     toast.error('Failed to place order.');
  //   }
  // };

  // Initial Load
  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Your Cart</h1>
      {error && <p className="text-danger text-center">{error}</p>}
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <div className="row">
          {/* Product Grid */}
          <div className="col-lg-8">
            <ul className="list-group">
              {cartItems.map((item) => (
                <li
                  key={item.productId}
                  className="list-group-item d-flex justify-content-between align-items-center mb-3"
                >
                  <img
                    src={item.image || 'https://via.placeholder.com/100'}
                    alt={item.name || 'Product Image'}
                    className="img-thumbnail"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                  <div className="ms-3 flex-grow-1">
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="mb-0">Price: ₹{item.price}</p>
                    <p className="mb-0">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-center pe-3">
                    <div className="btn-group mb-2">
                      <button
                        onClick={() => updateQuantity(item.productId, 'decrease')}
                        className="btn btn-outline-secondary btn-sm"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <button className="btn btn-outline-secondary btn-sm" disabled>
                        {item.quantity}
                      </button>
                      <button
                        onClick={() => updateQuantity(item.productId, 'increase')}
                        className="btn btn-outline-secondary btn-sm"
                      >
                        +
                      </button>
                    </div>
                    <br />
                    <button
                      onClick={() => removeItemFromCart(item.productId)}
                      className="btn btn-danger btn-sm"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Order Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>
                    ₹
                    {cartItems.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span>
                    ₹
                    {cartItems.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )}
                  </span>
                </div>
                <button
                  className="btn btn-success w-100 mt-3"
                  onClick={() => setShowPaymentModal(true)}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select Payment Method</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPaymentModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="paymentMethod"
                    id="cod"
                    value="Cash on Delivery"
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="cod">
                    Cash on Delivery
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="paymentMethod"
                    id="online"
                    value="Online Payment"
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="online">
                    Online Payment
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleCheckout}>
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
