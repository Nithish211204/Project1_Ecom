import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [editPrice, setEditPrice] = useState("");
    const [editAvailable, setEditAvailable] = useState(true);

    const navigate = useNavigate();

    // Fetch products when the component mounts
    const fetchProducts = async () => {
        const token = localStorage.getItem("authToken");
        try {
            const response = await fetch("http://localhost:8080/adddelete", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                console.error("Error fetching products");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Navigate to add product page
    const goToAdd = () => {
        navigate("/add");
    };

    // Navigate to delete product page
    const goToVendor = () => {
        navigate("/vendor");
    };

    // Delete product
    const deleteProduct = async (customId) => {
        const token = localStorage.getItem("authToken");
        try {
            const response = await fetch(`http://localhost:8080/adddelete/delete/${customId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                setProducts((prev) => prev.filter((product) => product.customId !== customId));
                alert("Product deleted successfully.");
            } else {
                console.error("Error deleting product.");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    // Save edited product
    const saveProduct = async (customId) => {
        const token = localStorage.getItem("authToken");
        try {
            const response = await fetch(`http://localhost:8080/adddelete/update/${customId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    price: parseFloat(editPrice),
                    available: editAvailable,
                }),
            });
            if (response.ok) {
                const updatedProduct = await response.json();
                setProducts((prev) =>
                    prev.map((product) =>
                        product.customId === customId ? updatedProduct : product
                    )
                );
                setEditingProductId(null);
                alert("Product updated successfully.");
            } else {
                console.error("Error updating product.");
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    // Start editing a product
    const startEditing = (product) => {
        setEditingProductId(product.customId);
        setEditPrice(product.price);
        setEditAvailable(product.available);
    };

    // Cancel editing
    const cancelEditing = () => {
        setEditingProductId(null);
    };

    return (
        <div>
            <button onClick={goToAdd}>Add Product</button>
            <button onClick={goToVendor}>Vendor</button>
            <h2>Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.customId}>
                        {editingProductId === product.customId ? (
                            <div>
                                <h2>{product.customId}</h2>
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <input
                                    type="number"
                                    value={editPrice}
                                    onChange={(e) => setEditPrice(e.target.value)}
                                    placeholder="Enter new price"
                                />
                                <select
                                    value={editAvailable}
                                    onChange={(e) => setEditAvailable(e.target.value === "true")}
                                >
                                    <option value="true">Available</option>
                                    <option value="false">Unavailable</option>
                                </select>
                                <button onClick={() => saveProduct(product.customId)}>Save</button>
                                <button onClick={cancelEditing}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <h2>{product.customId}</h2>
                                <h3>{product.name}</h3>
                                
                                <h3>Price: {product.price}</h3>
                                <h3>
                                    Availability: {product.available ? "Yes" : "No"}
                                </h3>
                                <button onClick={() => startEditing(product)}>Edit</button>
                                <button onClick={() => deleteProduct(product.customId)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;

