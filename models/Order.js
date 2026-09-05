const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
   {
      foodId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'FoodItem',
         required: true,
      },
      name: {
         type: String,
         required: true,
      },
      price: {
         type: Number,
         required: true,
      },
      quantity: {
         type: Number,
         required: true,
         min: 1,
      },
   },
   { _id: false }
);

const orderSchema = new mongoose.Schema(
   {
      customerName: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
      },
      phone: {
         type: String,
         required: true,
      },
      address: {
         type: String,
         required: true,
      },
      items: [orderItemSchema],
      totalAmount: {
         type: Number,
         required: true,
      },
      status: {
         type: String,
         enum: ['Pending', 'Preparing', 'Completed', 'Cancelled'],
         default: 'Pending',
      },
   },
   {
      timestamps: { createdAt: true, updatedAt: false },
   }
);

module.exports = mongoose.model('Order', orderSchema);
