const express = require('express')
const requireAuth = require('../middleware/authMiddleware')
const router = express.Router()

// En skyddad enpoint. Notera att vi har requireAuth som ett argument i funktionen. 

router.get('/', requireAuth, (req, res) => {
  res.status(200).json({
    message: 'Welcome to the protected route',
    user: req.user
  })
})

module.exports = router