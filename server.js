require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');

const foodRoutes = require('./routes/foodRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const ensureDefaultAdmin = async () => {
   const email = process.env.ADMIN_EMAIL || 'admin@emberandolive.com';
   const password = process.env.ADMIN_PASSWORD || 'admin123';

   const existingAdmin = await User.findOne({ email });

   if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
         name: 'Restaurant Admin',
         email,
         password: hashedPassword,
         role: 'admin',
      });

      console.log(`Default admin created: ${email}`);
   }
};

connectDB().then(() => ensureDefaultAdmin());

// ✅ CORS
app.use(
   cors({
      origin: 'https://restoran-frontendd.onrender.com',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
   })
);

app.use(express.json());

app.get('/', (req, res) => {
   res.json({ message: 'Restaurant API running successfully' });
});

app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/contact', contactRoutes);

app.listen(PORT, '0.0.0.0', () => {
   console.log(`Server running on port ${PORT}`);
});
