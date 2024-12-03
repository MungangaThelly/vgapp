const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Ta bort useNewUrlParser och useUnifiedTopology, dessa är inte längre nödvändiga
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Stäng applikationen om det inte går att ansluta till databasen
  }
};

module.exports = connectDB;
