const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

router.get('/', async (req, res) => {
   try {
      const messages = await ContactMessage.find().sort({ createdAt: -1 });
      res.json(messages);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

router.post('/', async (req, res) => {
   try {
      const message = await ContactMessage.create(req.body);
      res.status(201).json(message);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

module.exports = router;
