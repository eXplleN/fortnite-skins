const express = require('express');
const router = express.Router();

const skinRoutes = require('./skinRoutes');

router.use('/skins', skinRoutes);

module.exports = router;

