const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');;
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
const isAdminMiddleware = (req, res, next) => {
    if (req.user && req.user.admin) {
        return next();
    }
    return res.status(403).json({ message: 'Forbidden: Only admins can access this.' });
};
module.exports =  isAdminMiddleware ;
module.exports =  authMiddleware ;

