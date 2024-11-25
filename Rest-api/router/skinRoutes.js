const express = require('express');
const router = express.Router();
const { getAllSkins, createSkin, getSkinById, updateSkin, deleteSkin } = require('../controllers/skinController');


router.get('/', getAllSkins);


router.post('/', createSkin);


router.get('/:id', getSkinById);


router.put('/:id', updateSkin);


router.delete('/:id', deleteSkin);

module.exports = router;

