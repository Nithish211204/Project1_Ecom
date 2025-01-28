import React, { useState, useEffect } from "react";
import axios from "axios";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  // Fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  // Function to fetch orders from the backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/orders/place", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Assuming JWT token is saved in localStorage
        },
      });
      console.log(response.data); // Log the response for debugging
      setOrders([response.data]); // Assuming the response contains a single order, we wrap it in an array for easier mapping
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      console.error("Error fetching placed orders:", error);
    }
  };

  // Function to update order status to 'Out for Delivery'
  const handleOutForDelivery = async (orderId) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/orders/${orderId}`,
        {
          status: "Out for Delivery",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Send token with the request
          },
        }
      );
      console.log(response.data);
      fetchOrders(); // Refresh the list of orders after updating
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div>
      <h1>Placed Orders</h1>
      {error && <p className="error">{error}</p>}

      <div>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.orderId} className="order">
              <h2>Order ID: {order.orderId}</h2>
              <p>Status: {order.status}</p>

              <h3>Items:</h3>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    <p>Product: {item.name}</p>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Description: {item.description}</p>
                    <img src={item.image} alt={item.name} />
                  </li>
                ))}
              </ul>

              {order.customer && (
                <div>
                  <h3>Customer Details:</h3>
                  <p>Name: {order.customer.name}</p>
                  <p>Location: {order.customer.location}</p>
                  <p>Contact: {order.customer.contact}</p>
                </div>
              )}

              {/* Only show the button if the order status is "Placed" */}
              {order.status === "Placed" && (
                <button onClick={() => handleOutForDelivery(order.orderId)}>
                  Mark as Out for Delivery
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No placed orders found.</p>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
