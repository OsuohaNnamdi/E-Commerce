const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }, 
}, { timestamps: true });

// Hash the password before saving
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Method to validate password
userSchema.methods.isValidPass = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Create the User model
const User = mongoose.model("User", userSchema);

// Export the User model using CommonJS syntax
module.exports = User;
