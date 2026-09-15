const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');
const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get current admin
router.get('/me', auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select('-password');
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create initial admin (use once, then disable)
router.post('/setup', async (req, res) => {
  try {
    const count = await Admin.countDocuments();
    if (count > 0) return res.status(400).json({ message: 'Admin already exists' });
    const admin = await Admin.create({
      email: req.body.email || 'admin@physichem.com',
      password: req.body.password || 'admin123',
      name: req.body.name || 'Admin',
    });
    res.status(201).json({ message: 'Admin created', email: admin.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
