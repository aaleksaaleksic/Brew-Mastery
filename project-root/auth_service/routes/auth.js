const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const router = express.Router();
require('dotenv').config();

// Register route
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({ username, password: hashedPassword, email });
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user. ' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      { id: user.id, username: user.username, admin: user.admin },  // Dodajemo admin status u token
      process.env.JWT_SECRET
    );
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

router.get('/verify-token', async (req, res) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Vraćamo korisničke podatke (npr. admin status)
    res.json({ id: user.id, username: user.username, admin: user.admin });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});


module.exports = router;
