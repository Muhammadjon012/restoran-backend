const jwt = require('jsonwebtoken');

const authRequired = (req, res, next) => {
   const authHeader = req.headers.authorization;
   const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

   if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'restaurant_super_secret_key_2026');
      req.user = decoded;
      next();
   } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
   }
};

const adminOnly = (req, res, next) => {
   if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
   }

   next();
};

module.exports = { authRequired, adminOnly };
