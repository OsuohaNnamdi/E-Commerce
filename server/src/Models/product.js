const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    image: {
        type: String,
        required: false, // Image is optional
    },
}, { timestamps: true });

// Create the Product model
const Product = mongoose.model("Product", productSchema);

// Export the model using CommonJS
module.exports = Product;
