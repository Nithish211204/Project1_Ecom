const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { authenticate, authorizeRole } = require("./middleware");  // Correct path to auth middleware

// Add a new product (Only Admin)
router.post("/add", authenticate, authorizeRole("admin"), async (req, res) => {
    const { customId, name, description, price, image, available } = req.body;

    try {
        // Check if product with the customId already exists
        const existingProduct = await Product.findOne({ customId });
        if (existingProduct) {
            return res.status(400).json({ message: "Product with this ID already exists" });
        }

        const product = new Product({ customId, name, description, price, image, available });
        await product.save();
        res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Error adding product", error });
    }
});


router.get("/", authenticate, async (req, res) => {
    try {
        const products = await Product.find(); // Fetch products from the database
        res.status(200).json(products); // Send back the products
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
});




// Delete a product by customId (Admin only)
router.delete("/delete/:customId", authenticate, authorizeRole("admin"), async (req, res) => {
    const { customId } = req.params;

    try {
        const deletedProduct = await Product.findOneAndDelete({ customId });
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
});
// Update a product by customId
router.put("/update/:customId", authenticate, async (req, res) => {
    const { customId } = req.params;
    const { price, available } = req.body;

    try {
        // Validate input
        if (typeof price !== "number" || typeof available !== "boolean") {
            return res.status(400).json({ error: "Invalid input data." });
        }

        // Update product in the database
        const updatedProduct = await Product.findOneAndUpdate(
            { customId },
            { price, available },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found." });
        }

        res.status(200).json({ message: "Product updated successfully.", product: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;
