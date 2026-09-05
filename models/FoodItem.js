const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         trim: true,
      },
      description: {
         type: String,
         required: true,
      },
      price: {
         type: Number,
         required: true,
         min: 0,
      },
      category: {
         type: String,
         enum: ['Appetizers', 'Mains', 'Drinks', 'Desserts'],
         required: true,
      },
      image: {
         type: String,
         default: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
      },
      isAvailable: {
         type: Boolean,
         default: true,
      },
      isFeatured: {
         type: Boolean,
         default: false,
      },
      rating: {
         type: Number,
         default: 4.8,
         min: 0,
         max: 5,
      },
   },
   {
      timestamps: { createdAt: true, updatedAt: false },
   }
);

module.exports = mongoose.model('FoodItem', foodItemSchema);
