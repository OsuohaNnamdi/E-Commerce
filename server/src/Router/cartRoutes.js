// cartRoutes.js
const express = require('express');
const cartController = require('../Controller/cartController'); // Ensure correct path and casing
const { authenticate } = require('../Middlewares/auth'); // Ensure correct path and casing

const router = express.Router();

// Protect all routes with authentication middleware
router.use(authenticate);

// Add item to cart
router.post("/", cartController.addItemToCart); // Change this line

// Get user's cart
router.get("/", cartController.getCart);

// Remove item from cart
router.delete("/:itemId", cartController.removeItemFromCart); // Ensure correct function name

// Export the router using CommonJS
module.exports = router;
