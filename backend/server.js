import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import connectDB from './src/config/db.js';

const PORT = process.env.PORT || 3000;

// Connect to MongoDB, then start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✓ NOVA server running on port ${PORT} (${process.env.NODE_ENV || 'development'})`);
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`✗ Unhandled Rejection: ${err.message}`);
  process.exit(1);
});
