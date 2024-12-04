
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { 
  getAllSkins, 
  createSkin, 
  getSkinById, 
  updateSkin, 
  deleteSkin,
  getUserSkins 
} = require('../controllers/skinController');

router.get('/', getAllSkins);

router.post('/', verifyToken, createSkin);

router.get('/:id', getSkinById);

router.put('/:id',verifyToken, updateSkin);

router.delete('/:id', verifyToken, deleteSkin);

router.get('/user/my-skins', verifyToken, getUserSkins);

module.exports = router;
