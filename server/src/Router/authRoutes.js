const express = require('express');
const authController = require("../Controller/authController"); // Adjusted path


 
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/logout', authController.logout);
router.get('/me', authController.me);

module.exports = router;
