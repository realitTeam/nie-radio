require("dotenv").config();
const jwt = require("jsonwebtoken");

const authPermission = (req, res, next) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return res.status(401).json({ message: "Not Token, Unauthorized." });
  }

  // token verification
  // const tokenIsValid = jwt.verify(token, process.env.SECRET_KEY);
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Forbidden." });
  }

  return res.status(401).json({ message: "Unauthorized." });
};

module.exports = authPermission;
