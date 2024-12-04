const express = require('express');
const { verifyToken } = require('../utils/jwt');
const router = express.Router();

router.get('/protected', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  verifyToken(token)
    .then((decoded) => {
      res.json({ message: 'Protected data accessed', user: decoded });
    })
    .catch((err) => {
      res.status(401).json({ message: 'Invalid token', error: err });
    });
});

module.exports = router;
