const Boom = require('boom');
const User = require('../models/user');

// Get all users (admin only)
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password -__v"); // Exclude sensitive fields
        res.json(users);
    } catch (e) {
        next(e);
    }
};

// Get user by ID
const getUserById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).select("-password -__v");

        if (!user) {
            throw Boom.notFound("User not found.");
        }

        res.json(user);
    } catch (e) {
        next(e);
    }
};

// Update a user
const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const input = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, input, { new: true }).select("-password -__v");

        if (!user) {
            throw Boom.notFound("User not found.");
        }

        res.json(user);
    } catch (e) {
        next(e);
    }
};

// Delete a user
const deleteUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            throw Boom.notFound("User not found.");
        }

        res.json({ message: "User deleted successfully." });
    } catch (e) {
        next(e);
    }
};

// Get user profile (for logged-in user)
const getUserProfile = async (req, res, next) => {
    const { user_id } = req.payload;

    try {
        const user = await User.findById(user_id).select("-password -__v");

        if (!user) {
            throw Boom.notFound("User not found.");
        }

        res.json(user);
    } catch (e) {
        next(e);
    }
};

// Export the controller methods using CommonJS syntax
module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserProfile,
};
