import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        customId: "",
        name: "",
        description: "",
        price: "",
        image: "",
        available: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem("authToken");
    
        if (!token) {
            alert("No token found. Please log in.");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:8080/adddelete/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                const data = await response.json();
                alert("Product added successfully");
                setFormData({ customId: "", name: "", description: "", price: "", image: "", available: true });
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || "An error occurred while adding the product"}`);
            }
        } catch (error) {
            console.error("Error adding product:", error);
            alert("An error occurred while adding the product");
        }
        // console.log(token);
    };
    const goToDelete = () => {
        navigate("/delete");
        
    };
    const goToUpdate = () => {
        navigate("/update");
};

    return (
        <>
            <button  onClick={goToDelete}>
                Delete Product
            </button>  
             <button  onClick={goToUpdate}>
                Update Product
            </button>
            <h2>Add Product</h2> 
        <form onSubmit={handleSubmit} style={styles.form}>
           

            {/* <h2><Link to="/delete">Delete Product</Link></h2> */}
            <input
                type="text"
                name="customId"
                value={formData.customId}
                onChange={handleChange}
                placeholder="Product ID"
                required
            />
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
                required
            />
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Product Description"
                required
            />
            <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Product Price"
                required
            />
            <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Image URL"
            />
            <label>
                <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleChange}
                />
                Available
            </label>
            <button type="submit">Add Product</button>
        </form>
         </>
    );
};

const styles = {
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "400px",
        margin: "0 auto",
    },
};

export default AddProduct;
