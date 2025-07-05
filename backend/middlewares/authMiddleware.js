const jwt = require('jsonwebtoken');
const { CustomError } = require('../utils/authUtils');


const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomError('No token provided', 401);
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    throw new CustomError('Invalid or expired token', 401);
  }
};

module.exports = authMiddleware;