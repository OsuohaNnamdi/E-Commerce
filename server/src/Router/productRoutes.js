const express = require('express');
const productController = require('../Controller/productController');
const { authenticate, authorizeAdmin } = require('../Middlewares/auth'); 

const router = express.Router();

// Protect all routes with authentication middleware
router.use(authenticate);

// Create a new product (admin only)
router.post("/", authorizeAdmin, productController.createProduct);

// Get all products
router.get("/", productController.getAllProducts);

// Get a product by ID
router.get("/:productId", productController.getProductById);

// Update a product (admin only)
router.put("/:productId", authorizeAdmin, productController.updateProduct);

// Delete a product (admin only)
router.delete("/:productId", authorizeAdmin, productController.deleteProduct);

// Export the router using CommonJS
module.exports = router;
