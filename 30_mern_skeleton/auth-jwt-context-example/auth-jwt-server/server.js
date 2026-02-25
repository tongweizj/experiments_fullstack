const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

// 1. Middleware
// 防止跨域错误
app.use(cors({
  origin: 'http://localhost:3000', // Update to your Vite app's origin
  credentials: true, // Allow credentials (cookies) to be sent
}));
app.use(express.json());
app.use(cookieParser());

// 2. 设置密钥 Secret key
// Secret key for JWT (in production, store this in an environment variable)
const SECRET_KEY = 'my_secret_key';

// fake data
// In-memory user store
const users = {
  'user1': 'password1',
  'user2': 'password2',
};

// 3. Function to generate a JWT token
const generateToken = (username) => {
  return jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
};

console.log("generateToken:", generateToken)
// Route to handle login
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  // Simple authentication check (no database)
  if (users[username] && users[username] === password) {
    const token = generateToken(username);

    // Set the JWT as an HTTP-only cookie
    res.cookie('token', token, { 
      httpOnly: true, 
      sameSite: 'Lax', // Use 'Lax' for local development
      secure: false // Set to true only if using HTTPS in production
    });
    return res.json({ user: { name: username } });
  } else {
    return res.status(401).json({ message: 'Invalid username or password. Please try again.' });
  }
});

// Route to handle logout
app.post('/auth/logout', (req, res) => {
  // Clear the token cookie
  res.clearCookie('token', { 
    httpOnly: true, 
    sameSite: 'Lax', // Use 'Lax' for local development
    secure: false // Set to true only if using HTTPS in production
  });
  return res.json({ message: 'Logged out successfully', success: true });
});

// Route to verify the JWT token
app.get('/auth/verify', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided. Please log in to access this resource.' });
  }

  // Verify the token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token. Please log in again.' });
    }

    // Token is valid, return the user information
    return res.json({ user: { name: decoded.username } });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
