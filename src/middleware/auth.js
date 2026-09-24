const jwt = require('jsonwebtoken');
const env = require('../config/env');

function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing bearer token.' });
  }

  try {
    const decoded = jwt.verify(token, env.ADMIN_JWT_SECRET);
    req.admin = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid or expired token.' });
  }
}

module.exports = { requireAdmin };
