const jwt = require('jsonwebtoken');

// Middleware to verify if the JWT token is valid
const requireAuth = (req, res, next) => {
  // Retrieve the authorization header
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is present and follows the 'Bearer <token>' format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(' ')[1];

  // Verify the token using the JWT_SECRET from environment variables
  try {
    // Decode the token (you can add the algorithm option if needed, e.g. { algorithms: ['HS256'] })
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is stored securely in .env

    // Attach the decoded user data to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);

    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Handle expired tokens
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    }

    // Catch any other errors and send a general message
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = requireAuth;
