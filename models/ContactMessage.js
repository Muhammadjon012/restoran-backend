const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
      },
      phone: {
         type: String,
         default: '',
      },
      subject: {
         type: String,
         required: true,
      },
      message: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: { createdAt: true, updatedAt: false },
   }
);

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
