const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const { authRequired } = require('../middleware/authMiddleware');

router.post('/login', async (req, res) => {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         return res.status(400).json({ message: 'Email and password are required' });
      }

      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
         return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
         { id: user._id, email: user.email, role: user.role },
         process.env.JWT_SECRET || 'restaurant_super_secret_key_2026',
         { expiresIn: '8h' }
      );

      res.json({
         token,
         user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
         },
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

router.get('/me', authRequired, async (req, res) => {
   try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
         return res.status(404).json({ message: 'User not found' });
      }

      res.json({ user });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

module.exports = router;
