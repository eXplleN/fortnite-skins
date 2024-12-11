const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { 
  getAllSkins, 
  createSkin, 
  getSkinById, 
  updateSkin, 
  deleteSkin,
  getUserSkins,
  likeSkin,
  dislikeSkin,
  getLikesDislikes 
} = require('../controllers/skinController');

router.get('/', getAllSkins);

router.get('/', verifyToken, getUserSkins);

router.get('/:id', getSkinById);

router.post('/', verifyToken, createSkin);

router.put('/:id', verifyToken, updateSkin);

router.delete('/:id', verifyToken, deleteSkin);

router.post('/:id/like', verifyToken, likeSkin);

router.post('/:id/dislike', verifyToken, dislikeSkin);

router.get('/:id/likes-dislikes', getLikesDislikes);

module.exports = router;
