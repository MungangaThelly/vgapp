const mongoose = require('mongoose');

// Skapa en schema för användare
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Skapa och exportera modellen
module.exports = mongoose.model('User', userSchema);
