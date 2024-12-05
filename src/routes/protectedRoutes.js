const express = require('express');
const requireAuth = require('../middleware/authMiddleware');
const router = express.Router();

// Protected endpoint that requires the user to be authenticated
router.get('/protected', requireAuth, (req, res) => {
  res.status(200).json({
    message: 'Welcome to the protected route',
    user: req.user // Attach the decoded user info from the JWT token
  });
});

module.exports = router;
