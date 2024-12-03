const User = require('../models/User')

// I denna fil definerar vi logiken för hur vi ska interagrera med databasen. 
// Här tar vi emot variabler från vårt post-requests body (username, password)
// och använder dessa för att försöka skapa en newUser enligt User-modellen. 
// Vi tar sedan och försöker spara denna i dabasen med newUser.save()

const registerUser = async (req, res) => {
  const { username, password } = req.body

  try {
    const newUser = new User({ username, password })
    const user = await newUser.save()
    res.status(201).json(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}

module.exports = { registerUser }