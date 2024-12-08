const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUserProfile, getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware')

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

router.get('/profile', verifyToken, getUserProfile);

router.get('/:userId/skins', verifyToken, getWishlist);

router.post('/:userId/skins', verifyToken, addToWishlist);

router.delete('/:userId/skins/:skinId', verifyToken, removeFromWishlist);

module.exports = router;
