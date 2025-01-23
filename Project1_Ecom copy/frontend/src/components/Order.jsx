import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast from 'react-hot-toast';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('authToken');

  // Fetch orders from the backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching orders');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Your Orders</h1>
      {error && <p className="text-danger text-center">{error}</p>}
      {orders.length === 0 ? (
        <p className="text-center">No orders found</p>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div key={order._id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  {/* <h5 className="card-title">Order ID: {order._id}</h5> */}
                  <p>Status: {order.status}</p>
                  <p>Payment Method: {order.paymentMethod}</p>
                  <p>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                  <h6>Items:</h6>
                  <ul className="list-group">
                    {order.items.map((item) => (
                      <li key={item.product._id} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                              className="img-thumbnail me-2"
                            />
                            <span>{item.product.name}</span>
                          </div>
                          <div>
                            <span>
                              ₹{item.product.price} x {item.product.quantity} = ₹
                              {item.total}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <h6 className="mt-3">Order Total: ₹
                    {order.items.reduce((total, item) => total + item.total, 0)}
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
