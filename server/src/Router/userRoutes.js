const express = require('express');
const userController = require('../Controller/userController');
const { authenticate, authorizeAdmin } = require('../Middlewares/auth'); // Destructure the middleware functions

const router = express.Router();

// Protect all routes with authentication middleware
router.use(authenticate);

router.get("/", userController.getAllUsers); // Get all users
router.get("/:userId", userController.getUserById); // Get user by ID
router.put("/:userId", userController.updateUser); // Update user info
router.delete("/:userId", authorizeAdmin, userController.deleteUser); // Delete user, only admin authorized

// Export the router using CommonJS syntax
module.exports = router;
