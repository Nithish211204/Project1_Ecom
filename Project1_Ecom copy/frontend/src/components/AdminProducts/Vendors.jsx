import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Vendors = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        phone: "",
        name: "",
        location: "",
        pincode: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value, // Dynamically update the corresponding key in the state
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
            const response = await fetch("http://localhost:8080/auth/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                alert("Vendor added successfully!");
                setFormData({ phone: "", name: "", location: "", pincode: "" }); // Reset form
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || "An error occurred while adding the vendor."}`);
            }
        } catch (error) {
            console.error("Error adding vendor:", error);
            alert("An error occurred while adding the vendor.");
        }
    };

    const goToDelete = () => {
        navigate("/delete");
    };

    const goToAdd = () => {
        navigate("/add");
    };

    return (
        <>
            <div style={styles.nav}>
                <button onClick={goToDelete}>Delete Product</button>
                <button onClick={goToAdd}>Add Product</button>
            </div>
            <h2 style={styles.heading}>Add Vendor</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    required
                />
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                    required
                />
                <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    required
                />
                <button type="submit" style={styles.submitButton}>
                    Add Vendor
                </button>
            </form>
        </>
    );
};

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-around",
        marginBottom: "20px",
    },
    heading: {
        textAlign: "center",
        marginBottom: "20px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "400px",
        margin: "0 auto",
    },
    submitButton: {
        backgroundColor: "#007BFF",
        color: "#FFF",
        padding: "10px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default Vendors;
