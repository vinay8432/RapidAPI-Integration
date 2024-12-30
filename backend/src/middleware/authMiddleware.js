const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv')

dotenv.config()
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    
    const decoded = jwt.verify(token, process.env.JwtSecerat);
    req.user = await User.findById(decoded._id);
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
