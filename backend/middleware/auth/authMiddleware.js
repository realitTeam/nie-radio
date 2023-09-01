// authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Authorization failed" });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const userRole = decodedToken.role;

      if (userRole !== requiredRole) {
        return res.status(403).json({ message: "Access denied" });
      }

      req.user = decodedToken;
      next();
    } catch (error) {
      res.status(401).json({ message: "Authorization failed" });
    }
  };
};

module.exports = authMiddleware;
