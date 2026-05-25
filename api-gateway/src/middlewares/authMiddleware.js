const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Token is not valid' });
    }
};

const roleMiddleware = (roles) => {
    return (req, res, next) => {
        // Note: To implement full RBAC, the user object should include the role.
        // In this simplified version, we assume the gateway has access to the user details or we skip for now.
        // For a real project, we would verify the role from the token payload.
        // Let's assume the token has 'role' in it.

        const token = req.header('Authorization')?.split(' ')[1];
        const decoded = jwt.decode(token);

        if (!roles.includes(decoded.role)) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }
        next();
    };
};

module.exports = { authMiddleware, roleMiddleware };
