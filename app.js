require('dotenv').config();  // Läs in miljövariabler från .env
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./src/config/db'); // Databaskoppling
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRoutes = require('./src/routes/userRoutes'); // Användarrutter

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Anslut till databasen
connectDB();

// Använd användarrutter
app.use('/api', userRoutes);

// Global felhantering
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Något gick fel!', error: err.message });
});

// Starta servern
app.listen(port, () => {
  console.log(`Servern kör på port ${port}`);
});
