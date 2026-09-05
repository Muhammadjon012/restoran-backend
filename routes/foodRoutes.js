const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');
const { authRequired, adminOnly } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
   try {
      const foods = await FoodItem.find().sort({ createdAt: -1 });
      res.json(foods);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

router.get('/featured', async (req, res) => {
   try {
      const featuredFoods = await FoodItem.find({
         isFeatured: true,
         isAvailable: true,
      }).sort({ rating: -1, createdAt: -1 }).limit(6);

      res.json(featuredFoods);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

router.post('/', authRequired, adminOnly, async (req, res) => {
   try {
      const newFood = await FoodItem.create(req.body);
      res.status(201).json(newFood);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

router.put('/:id', authRequired, adminOnly, async (req, res) => {
   try {
      const updatedFood = await FoodItem.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
         runValidators: true,
      });

      if (!updatedFood) {
         return res.status(404).json({ message: 'Food item not found' });
      }

      res.json(updatedFood);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

router.delete('/:id', authRequired, adminOnly, async (req, res) => {
   try {
      const deletedFood = await FoodItem.findByIdAndDelete(req.params.id);

      if (!deletedFood) {
         return res.status(404).json({ message: 'Food item not found' });
      }

      res.json({ message: 'Food item deleted successfully' });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

module.exports = router;
