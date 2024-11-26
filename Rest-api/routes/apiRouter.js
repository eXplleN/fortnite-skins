const express = require('express');
const { getAllSkins, getSkinById, createSkin, updateSkin, deleteSkin } = require('../controllers/skinController');

const router = express.Router();

router.get('/skins', getAllSkins);
router.get('/skins/:id', getSkinById);
router.post('/skins', createSkin);
router.put('/skins/:id', updateSkin);
router.delete('/skins/:id', deleteSkin);

module.exports = router;
