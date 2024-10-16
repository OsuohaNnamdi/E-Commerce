const jwt = require("jsonwebtoken");
const Boom = require("boom");

// Load environment variables
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, JWT_ACCESS_EXPIRATION, JWT_REFRESH_EXPIRATION } = process.env;

// Sign an access token
const signAccessToken = async (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            JWT_ACCESS_SECRET,
            { expiresIn: JWT_ACCESS_EXPIRATION || "15m" }, // Default expiration is 15 minutes
            (err, token) => {
                if (err) {
                    return reject(Boom.internal("Could not generate access token."));
                }
                resolve(token);
            }
        );
    });
};

// Sign a refresh token
const signRefreshToken = async (userId) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { user_id: userId },
            JWT_REFRESH_SECRET,
            { expiresIn: JWT_REFRESH_EXPIRATION || "7d" }, // Default expiration is 7 days
            (err, token) => {
                if (err) {
                    return reject(Boom.internal("Could not generate refresh token."));
                }
                resolve(token);
            }
        );
    });
};

// Verify a refresh token
const verifyRefreshToken = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_REFRESH_SECRET, (err, payload) => {
            if (err) {
                return reject(Boom.unauthorized("Invalid refresh token."));
            }
            resolve(payload.user_id);
        });
    });
};

// Verify an access token
const verifyAccessToken = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_ACCESS_SECRET, (err, payload) => {
            if (err) {
                return reject(Boom.unauthorized("Invalid access token."));
            }
            resolve(payload);
        });
    });
};

// Export the functions using CommonJS
module.exports = {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
    verifyAccessToken
};
