const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

router.get('/', async (req, res) => {
   try {
      const reservations = await Reservation.find().sort({ date: 1, timeSlot: 1 });
      res.json(reservations);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

router.post('/', async (req, res) => {
   try {
      const reservation = await Reservation.create(req.body);
      res.status(201).json(reservation);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

module.exports = router;
