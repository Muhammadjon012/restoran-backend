const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/', async (req, res) => {
   try {
      const { status } = req.query;
      let filter = {};

      if (status) {
         filter.status = status;
      }

      const orders = await Order.find(filter).sort({ createdAt: -1 });
      res.json(orders);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

router.post('/', async (req, res) => {
   try {
      const newOrder = await Order.create(req.body);
      res.status(201).json(newOrder);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

router.patch('/:id/status', async (req, res) => {
   try {
      const { status } = req.body;

      const updatedOrder = await Order.findByIdAndUpdate(
         req.params.id,
         { status },
         { new: true }
      );

      if (!updatedOrder) {
         return res.status(404).json({ message: 'Order not found' });
      }

      res.json(updatedOrder);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

module.exports = router;
