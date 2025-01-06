import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // To navigate to Cart Page
import "./ProductPage.css";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [quantities, setQuantities] = useState({});
    const navigate = useNavigate();

    // Fetch products on page load
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/products");
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch products");
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Handle quantity change for a product
    const handleQuantityChange = (productId, value) => {
        setQuantities((prev) => ({ ...prev, [productId]: parseInt(value, 10) }));
    };

    // Add selected product to the cart
    const addToCart = async (productId,name,image,price) => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("Please log in to add products to your cart.");
            return;
        }
    
        try {
            const quantity = quantities[productId] || 1;  // Default to 1 if no quantity is selected
            console.log("Adding to cart with values:", { productId,name,image,price, quantity });
    
            const response = await fetch("http://localhost:5000/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ productId,name,image,price, quantity }), // Correctly stringify the body
            });
    
            if (!response.ok) {
                const errorData = await response.text();  // Read the response as text (HTML)
                console.log("Error response from server:", errorData);
                alert(`Error: ${response.status} - ${errorData}`);
            } else {
                const data = await response.json();  // Read the response as JSON
                alert("Product added to cart");
            }
        } catch (err) {
            console.log("Error adding product to cart:", err);
            alert("Failed to add product to cart.");
        }
    };
    

    // Navigate to Cart Page
    const goToCart = () => {
        navigate("/cart");
    };

    // Display loading, error, or the products
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="all-products">
            <h1>All Products</h1>
            {/* <button className="go-to-cart" onClick={goToCart}>
                Go to Cart
            </button> */}
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.customId} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p><strong>₹{product.price}</strong></p>
                        <div className="quantity-container">
                            <label htmlFor={`quantity-${product.customId}`}>Quantity:</label>
                            <select
                                id={`quantity-${product.customId}`}
                                value={quantities[product.customId] || 1}
                                onChange={(e) => handleQuantityChange(product.customId, e.target.value)}
                            >
                                {[...Array(5)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button onClick={() => addToCart(product.customId,product.name,product.image,product.price)}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;