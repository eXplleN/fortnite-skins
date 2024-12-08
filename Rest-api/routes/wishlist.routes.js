const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { 
  getWishlist,  
  addToWishlist,    
  removeFromWishlist 
} = require('../controllers/wishlistController');

router.get('/users/:userId/wishlist', verifyToken, getWishlist);

router.post('/users/:userId/wishlist', verifyToken, addToWishlist);

router.delete('/users/:userId/wishlist/:skinId', verifyToken, removeFromWishlist);

module.exports = router;
