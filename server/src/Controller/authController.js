const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwt');
const authValidation = require('../Validations/authValidation');
const Boom = require('boom');
const User = require('../models/user');

// Register a new user
const register = async (req, res, next) => {
    const input = req.body;
    const { error } = authValidation.validate(input);
    
    if (error) {
        return next(Boom.badRequest(error.details[0].message));
    }
    
    try {
        const isExists = await User.findOne({ email: input.email });
        if (isExists) {
            return next(Boom.conflict("This e-mail is already in use."));
        }
        
        const user = new User(input);
        const data = await user.save();
        const userData = data.toObject();
        delete userData.password;
        delete userData.__v;

        const accessToken = await signAccessToken({ user_id: user._id, role: user.role });
        const refreshToken = await signRefreshToken(user._id);

        res.json({ user: userData, accessToken, refreshToken });
    } catch (e) {
        next(e);
    }
};

// Login a user
const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(Boom.unauthorized("Invalid email or password."));
        }

        const isMatch = await user.isValidPass(password);
        if (!isMatch) {
            return next(Boom.unauthorized("Invalid email or password."));
        }

        const accessToken = await signAccessToken({ user_id: user._id, role: user.role });
        const refreshToken = await signRefreshToken(user._id);

        res.json({ user: { email: user.email, role: user.role }, accessToken, refreshToken });
    } catch (e) {
        next(e);
    }
};

// Refresh access token
const refreshToken = async (req, res, next) => {
    const { token } = req.body;

    if (!token) {
        return next(Boom.unauthorized("Refresh token required"));
    }

    try {
        const payload = await verifyRefreshToken(token);
        const accessToken = await signAccessToken({ user_id: payload.user_id, role: payload.role });
        res.json({ accessToken });
    } catch (e) {
        next(Boom.unauthorized("Invalid refresh token"));
    }
};

// Logout a user
const logout = async (req, res, next) => {
    // No need to handle Redis for logout anymore
    res.sendStatus(204); // No Content
};

// Get current user details
const me = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.user_id).select("-password -__v");
        if (!user) {
            return next(Boom.notFound("User not found."));
        }
        res.json(user);
    } catch (e) {
        next(e);
    }
};

module.exports = {
    register,
    login,
    refreshToken,
    logout,
    me,
};