const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    
    
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access Denied. Invalid token format.' });
    }

    try {
        const cleanedToken = token.replace('Bearer ', '');
        const decoded = jwt.verify(cleanedToken, process.env.JWT_SECRET);

        req.user = decoded; 
        next();
    } catch (error) {
        
        if (process.env.NODE_ENV === 'development') {
            console.error('Token verification failed:', error);
        }

        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { verifyToken };
