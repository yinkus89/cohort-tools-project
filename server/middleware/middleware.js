// Middleware to verify JWT token
const jwt = require('jsonwebtoken'); // Make sure jwt is required
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key"; // Define or load your secret key

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

module.exports = { verifyToken };
