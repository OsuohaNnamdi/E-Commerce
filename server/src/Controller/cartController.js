const Boom = require("boom");
const Cart = require("../models/cart");
const User = require('../models/user');

// Get the user's cart
const getCart = async (req, res, next) => {
    const { user_id } = req.payload;

    try {
        const cart = await Cart.findOne({ userId: user_id }).populate("items.productId", "name price");
        
        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        }

        res.json(cart);
    } catch (e) {
        next(e);
    }
};

// Add item to the cart
const addItemToCart = async (req, res, next) => {
    const { user_id } = req.payload;
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId: user_id });

        // If the cart doesn't exist, create a new one
        if (!cart) {
            cart = new Cart({ userId: user_id, items: [] });
        }

        // Check if the item already exists in the cart
        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        
        if (existingItem) {
            // If it exists, update the quantity
            existingItem.quantity += quantity;
        } else {
            // If it doesn't exist, add a new item
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(201).json(cart);
    } catch (e) {
        next(e);
    }
};

// Remove item from the cart
const removeItemFromCart = async (req, res, next) => {
    const { user_id } = req.payload;
    const { productId } = req.body;

    try {
        const cart = await Cart.findOne({ userId: user_id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        }

        // Filter out the item to be removed
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();

        res.json(cart);
    } catch (e) {
        next(e);
    }
};

// Export using CommonJS syntax
module.exports = {
    getCart,
    addItemToCart, // Make sure this function is exported correctly
    removeItemFromCart, // Ensure this matches your route
    // ... other exports
};
