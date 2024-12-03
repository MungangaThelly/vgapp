const jwt = require('jsonwebtoken')

// Denna middleware kollar ifall de token du fick tillbaka vid inlogg 
// och som nu skickas med i ditt req är giltligt. Ifall du har ett giltilgt token
// får du besöka endpointen och blir alltså forwarded med next()

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token required' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, 'JWT_SECRET')
    req.user = decoded
    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}

module.exports = requireAuth