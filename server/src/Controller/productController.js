const Boom = require('boom');
const Product = require('../models/product');

// Get all products
const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (e) {
        next(e);
    }
};

// Get product by ID
const getProductById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        if (!product) {
            throw Boom.notFound("Product not found.");
        }

        res.json(product);
    } catch (e) {
        next(e);
    }
};

// Create a new product
const createProduct = async (req, res, next) => {
    const input = req.body;

    try {
        const product = new Product(input);
        await product.save();
        res.status(201).json(product);
    } catch (e) {
        next(e);
    }
};

// Update a product
const updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const input = req.body;

    try {
        const product = await Product.findByIdAndUpdate(id, input, { new: true });

        if (!product) {
            throw Boom.notFound("Product not found.");
        }

        res.json(product);
    } catch (e) {
        next(e);
    }
};

// Delete a product
const deleteProduct = async (req, res, next) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            throw Boom.notFound("Product not found.");
        }

        res.json({ message: "Product deleted successfully." });
    } catch (e) {
        next(e);
    }
};

// Exporting the controller functions using CommonJS
module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
