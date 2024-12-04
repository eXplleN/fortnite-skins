const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        const cleanedToken = token.replace('Bearer ', '');
        const decoded = jwt.verify(cleanedToken, process.env.JWT_SECRET);
        
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = { verifyToken };
