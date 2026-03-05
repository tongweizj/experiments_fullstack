require('dotenv').config();
const jwt = require('jsonwebtoken');
const users = require('../models/User');

const SECRET_KEY = process.env.JWT_SECRET;

// 辅助函数
const generateToken = (username) => {
  return jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username] === password) {
    const token = generateToken(username);
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'Lax',
      secure: false,
    });
    return res.json({ user: { name: username } });
  }
  return res.status(401).json({ message: 'Invalid username or password.' });
};

exports.logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'Lax',
    secure: false,
  });
  return res.json({ message: 'Logged out successfully', success: true });
};

exports.verify = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }
    return res.json({ user: { name: decoded.username } });
  });
};
