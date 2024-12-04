const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUserProfile } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware')

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

router.get('/profile',verifyToken, getUserProfile);

module.exports = router;
