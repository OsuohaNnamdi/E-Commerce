import Joi from 'joi';

const userValidation = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(), // for creating or updating password
    role: Joi.string().valid('user', 'admin').required()
});

export default userValidation;
