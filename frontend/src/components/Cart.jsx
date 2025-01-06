import React, { useState, useEffect } from 'react';
import "./ProductPage.css";
const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState('');
    // Ensure the token exists and is valid.

    // Fetch Cart Items
    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch('http://localhost:5000/cart', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
console.log(token);
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Error fetching cart');
            }

            const data = await response.json();
            setCartItems(data.items || []);
            setError(''); // Clear any previous errors
        } catch (err) {
            setError(err.message || 'Error fetching cart');
        }
        console.log(cartItems);
    };

    // Remove Item from Cart
    const removeItemFromCart = async (productId) => {
        try {
            const response = await fetch(`http://localhost:5000/cart/${productId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Error removing item');
            }

            await fetchCartItems(); // Refresh cart after deletion
        } catch (err) {
            setError(err.message || 'Error removing item');
        }
    };

    // Initial Load
    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <div>
            <h1>Your Cart</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul><div className="product-grid">
                    {cartItems.map((item) => (
                        <li key={item.product._id} className="product-card">
                            <img
                                src={item.product.image || 'https://via.placeholder.com/100'}
                                alt={item.product.name || 'Product Image'}
                                
                            />
                            <h3>{item.product.name}</h3>
                            <p>Price: ₹{item.product.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <button
                                onClick={() => removeItemFromCart(item.product._id)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
              </div>  </ul>
            )}
        </div>
    );
};

export default Cart;
