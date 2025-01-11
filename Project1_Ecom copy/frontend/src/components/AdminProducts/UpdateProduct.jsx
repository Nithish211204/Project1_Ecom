import React from 'react';

const UpdateProduct = () => {

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


    return (
        <div>
            <h1>Update Product</h1>
            <form>
                <div>
                    <label htmlFor="productName">Product Name:</label>
                    <input type="text" id="productName" name="productName" />
                </div>
                <div>
                    <label htmlFor="productImage">Product Image:</label>
                    <input type="file" id="productImage" name="productImage" />
                </div>
                <div>
                    <img src="https://via.placeholder.com/150" alt="Product" />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateProduct;