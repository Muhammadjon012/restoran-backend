const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
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
      date: {
         type: String,
         required: true,
      },
      timeSlot: {
         type: String,
         required: true,
      },
      guestsCount: {
         type: Number,
         required: true,
         min: 1,
      },
      status: {
         type: String,
         default: 'Confirmed',
      },
   },
   {
      timestamps: { createdAt: true, updatedAt: false },
   }
);

module.exports = mongoose.model('Reservation', reservationSchema);
