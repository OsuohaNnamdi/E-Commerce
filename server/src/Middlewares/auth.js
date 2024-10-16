const Boom = require("boom");
const verifyAccessToken = require("../helpers/jwt");

// Middleware to authenticate user with JWT
const authenticate = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Get token from 'Authorization' header

    if (!token) {
        return next(Boom.unauthorized("Access token required."));
    }

    try {
        const payload = await verifyAccessToken(token);
        req.payload = payload; // Attach the payload to the request object
        next(); // Proceed to the next middleware/route handler
    } catch (e) {
        next(e); // Pass the error to the error handling middleware
    }
};

// Middleware to authorize admin users
const authorizeAdmin = (req, res, next) => {
    const { role } = req.payload; // Assuming role is in the payload

    if (role !== "admin") {
        return next(Boom.forbidden("Access denied. Admins only."));
    }

    next(); // Proceed to the next middleware/route handler
};

// Export the functions using CommonJS
module.exports = {
    authenticate,
    authorizeAdmin
};
