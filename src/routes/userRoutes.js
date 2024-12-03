const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Skapa användare
router.post('/users', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kontrollera om användaren redan finns
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'Användare redan existerar' });
    }

    // Hasha lösenordet
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Skapa användaren
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json(newUser); // Returnera skapad användare
  } catch (error) {
    res.status(400).json({ message: 'Fel vid skapande av användare', error: error.message });
  }
});

// Hämta alla användare
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users); // Returnera alla användare
  } catch (error) {
    res.status(500).json({ message: 'Fel vid hämtning av användare', error: error.message });
  }
});

// Hämta användare via ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Användare ej hittad' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Fel vid hämtning av användare', error: error.message });
  }
});

// Uppdatera användare
router.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, 
      { username: req.body.username },
      { new: true } // Returnera den uppdaterade användaren
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Användare ej hittad' });
    }

    res.status(200).json(updatedUser); // Returnera uppdaterad användare
  } catch (error) {
    res.status(500).json({ message: 'Fel vid uppdatering av användare', error: error.message });
  }
});

// Ta bort användare
router.delete('/users/:id', async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Användare ej hittad' });
    }
    res.status(200).json({ message: 'Användare borttagen' });
  } catch (error) {
    res.status(500).json({ message: 'Fel vid borttagning av användare', error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Ogiltiga uppgifter' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Ogiltiga uppgifter' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Serverfel', error: error.message });
  }
});

module.exports = router;
