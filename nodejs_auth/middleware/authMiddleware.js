import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).send({ "status": "failed", "message": "No token provided" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send({ "status": "failed", "message": "Forbidden" });

        req.userID = user.userID;
        req.role = user.role;
        next();
    });
};
