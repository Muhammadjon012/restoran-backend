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

const FRONTEND_URL = 'https://restoran-frontendd.onrender.com';

// ==================================================
// CORS
// ==================================================

app.use(
   cors({
      origin: FRONTEND_URL,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
   })
);

// ==================================================
// BODY PARSER
// ==================================================

app.use(express.json());

// ==================================================
// HEALTH CHECK
// ==================================================

app.get('/', (req, res) => {
   res.status(200).json({
      success: true,
      message: 'Restaurant API running successfully',
   });
});

// ==================================================
// API ROUTES
// ==================================================

app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/contact', contactRoutes);

// ==================================================
// 404 HANDLER
// ==================================================

app.use((req, res) => {
   res.status(404).json({
      success: false,
      message: `Route not found: ${req.method} ${req.originalUrl}`,
   });
});

// ==================================================
// ERROR HANDLER
// ==================================================

app.use((err, req, res, next) => {
   console.error('SERVER ERROR:', err);

   res.status(500).json({
      success: false,
      message: 'Internal server error',
   });
});

// ==================================================
// START SERVER
// ==================================================

const startServer = async () => {
   try {
      console.log('Connecting to MongoDB...');

      await connectDB();

      console.log('MongoDB connected successfully');

      // ==============================================
      // CREATE DEFAULT ADMIN
      // ==============================================

      const email =
         process.env.ADMIN_EMAIL || 'admin@emberandolive.com';

      const password =
         process.env.ADMIN_PASSWORD || 'admin123';

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
      } else {
         console.log(`Admin already exists: ${email}`);
      }

      // ==============================================
      // START EXPRESS
      // ==============================================

      app.listen(PORT, '0.0.0.0', () => {
         console.log('======================================');
         console.log(`Server running on port ${PORT}`);
         console.log(`CORS allowed: ${FRONTEND_URL}`);
         console.log('======================================');
      });

   } catch (error) {
      console.error('======================================');
      console.error('SERVER STARTUP ERROR');
      console.error(error);
      console.error('======================================');

      process.exit(1);
   }
};

startServer();
