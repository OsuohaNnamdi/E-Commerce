const joi = require('joi');

const authValidation = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()  // Password must be at least 6 characters
});

module.exports = authValidation;
