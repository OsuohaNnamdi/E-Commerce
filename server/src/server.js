const express = require('express');
const mongoose = require('mongoose');
const Boom = require('boom'); // Error handling
const cors = require('cors'); // Enable CORS
const dotenv = require('dotenv'); // Load environment variables
const authRoutes = require('./Router/authRoutes.js'); // Authentication routes
const userRoutes = require('./Router/userRoutes.js'); // User management routes
const productRoutes = require('./Router/productRoutes.js'); // Product routes
const cartRoutes = require('./Router/cartRoutes.js'); // Shopping cart routes

dotenv.config();
 
 const app = express(); // Create Express application
 const PORT = process.env.PORT; // || 5000; // Set port, default to 5000 if not specified

 // Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected')) // Log on successful connection
    .catch(err => {
        console.error('MongoDB connection error:', err); // Log connection errors
        process.exit(1); // Exit process on failure
    });

 

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/users', userRoutes); // User management routes
app.use('/api/products', productRoutes); // Product routes
app.use('/api/cart', cartRoutes); // Shopping cart routes

// Error Handling Middleware
app.use((err, req, res, next) => {
    if (Boom.isBoom(err)) {
        return res.status(err.output.statusCode).json(err.output.payload); // Return Boom error response
    }
    console.error(err); // Log error details
    res.status(500).json({ message: 'Internal Server Error' }); // Return generic error response
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log server start
});

