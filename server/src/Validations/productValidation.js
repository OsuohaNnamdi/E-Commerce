import Joi from 'joi';

const productValidation = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    price: Joi.number().positive().required(),
    stock: Joi.number().integer().min(0).required()
});

export default productValidation;
