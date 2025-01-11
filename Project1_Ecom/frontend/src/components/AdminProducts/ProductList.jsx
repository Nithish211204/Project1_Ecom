import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    // Fetch products when the component mounts
    const fetchProducts = async () => {
        const token = localStorage.getItem("authToken");
        try {
            const response = await fetch("http://localhost:8080/adddelete", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setProducts(data); // Set the products to state
            } else {
                console.error("Error fetching products");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Delete product handler
    const deleteProduct = async (customId) => {
        const token = localStorage.getItem("authToken");
        try {
            const response = await fetch(`http://localhost:8080/adddelete/delete/${customId}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message); // Success message
                fetchProducts(); // Re-fetch the products list after deletion
            } else {
                const errorData = await response.json();
                alert(errorData.message); // Show error message
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("An error occurred while deleting the product.");
        }
    };

    useEffect(() => {
        fetchProducts(); // Fetch products when component mounts
    }, []);
    const goToAdd= () => {
        navigate("/add");
    };
    const goToUpdate = () => {
        navigate("/update");
};
    return (
        <div>
             <button  onClick={goToAdd}>
                Add Product
            </button>  
             <button  onClick={goToUpdate}>
                Update Product
            </button>
            <h2>Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.customId}>
                        <h2>{product.customId}</h2>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <h3>{product.price}</h3>
                        <button onClick={() => deleteProduct(product.customId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
