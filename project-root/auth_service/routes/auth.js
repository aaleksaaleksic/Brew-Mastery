const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const router = express.Router();
require('dotenv').config();


router.get('/users', async (req, res) => {
  const token = req.headers['authorization'].split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded.admin) {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }

  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'admin']  // Ne uključujemo password
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users.' });
  }
});


router.put('/users/:id', async (req, res) => {
  const token = req.headers['authorization'].split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded.admin) {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }

  const { username, email, admin } = req.body;
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      user.username = username || user.username;
      user.email = email || user.email;
      user.admin = admin !== undefined ? admin : user.admin;  // Opciono ažuriranje admin statusa
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error updating user.' });
  }
});

router.get('/users/:id', async (req, res) => {
  const token = req.headers['authorization'].split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded.admin) {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }

  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'email', 'admin']  // Ne uključujemo password
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error fetching user.' });
  }
});

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
