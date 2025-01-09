import React from 'react';

const UpdateProduct = () => {
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