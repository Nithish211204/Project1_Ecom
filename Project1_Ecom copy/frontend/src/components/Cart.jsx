import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('authToken');

  // Fetch Cart Items
  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(response.data.items || []);
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Update cart items in state dynamically
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: response.data.updatedQuantity }  // Use updated quantity
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove item from state
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.product._id !== productId)
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Error removing item');
    }
  };

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
                  key={item.product._id}
                  className="list-group-item d-flex justify-content-between align-items-center mb-3"
                >
                  {/* Product Image */}
                  <img
                    src={item.product.image || 'https://via.placeholder.com/100'}
                    alt={item.product.name || 'Product Image'}
                    className="img-thumbnail"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />

                  {/* Product Details */}
                  <div className="ms-3 flex-grow-1">
                    <h5 className="mb-1">{item.product.name}</h5>
                    <p className="mb-0">Price: ₹{item.product.price}</p>
                    <p className="mb-0">Quantity: {item.quantity}</p>
                  </div>

                  <div className='text-center pe-3'>
                    {/* Quantity Controls */}
                  <div className="btn-group mb-2 ">
                    <button
                      onClick={() => updateQuantity(item.product._id, 'decrease')}
                      className="btn btn-outline-secondary btn-sm"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <button className="btn btn-outline-secondary btn-sm" disabled>
                      {item.quantity}
                    </button>
                    <button
                      onClick={() => updateQuantity(item.product._id, 'increase')}
                      className="btn btn-outline-secondary btn-sm"
                    >
                      +
                    </button>
                  </div>
                  <br />

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItemFromCart(item.product._id)}
                    className="btn btn-danger btn-sm "
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
                      (total, item) => total + item.product.price * item.quantity,
                      0
                    )}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between font-weight-bold">
                  <span>Total</span>
                  <span>
                    ₹
                    {cartItems.reduce(
                      (total, item) => total + item.product.price * item.quantity,
                      0
                    )}
                  </span>
                </div>
                <button className="btn btn-success w-100 mt-3">Proceed to Checkout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
