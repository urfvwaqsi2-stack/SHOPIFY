const express = require('express');
const router = express.Router();

// Mock User DB
const users = [];

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'admin@shofipy.com' && password === 'admin123') {
    return res.json({
      token: 'mock-jwt-token-admin',
      user: { id: 1, name: 'Admin User', email, role: 'admin' }
    });
  }

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    return res.json({
      token: 'mock-jwt-token-user',
      user: { id: user.id, name: user.name, email: user.email, role: 'user' }
    });
  }

  res.status(401).json({ message: 'Invalid credentials. Use admin@shofipy.com / admin123 for demo.' });
});

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);
  
  res.status(201).json({
    token: 'mock-jwt-token-user',
    user: { id: newUser.id, name, email, role: 'user' }
  });
});

module.exports = router;
