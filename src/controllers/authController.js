const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// authController.js
const login = (req, res) => {
  const { username, password } = req.body;

  // Add your authentication logic here (e.g., check user credentials)
  if (username === 'admin' && password === 'password') {
    return res.status(200).json({ message: 'Login successful' });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
};
    const token = jwt.sign(
      { id: user._id, username: user.username },
      'JWT_SECRET',
      { expiresIn: '1h' }
    )

    res.status(200).json({token})
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { login }