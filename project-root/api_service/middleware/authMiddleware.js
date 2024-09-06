
// Middleware za validaciju JWT tokena
const jwt = require('jsonwebtoken');

// Middleware za validaciju JWT tokena
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    console.log('Token not provided');
    return res.status(403).json({ error: 'No token provided' });
  }

  try {
    console.log('Token received: ', token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token: ', decoded);
    req.user = decoded; // Postavljamo korisničke podatke u req objekt
    next();
  } catch (err) {
    console.log('JWT verification error: ', err);
    return res.status(401).json({ error: 'Invalid token' });
  }
};


// Middleware za proveru admin privilegija
const authorizeAdmin = (req, res, next) => {
  if (!req.user.admin) {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();
};

module.exports = {
  authenticateJWT,
  authorizeAdmin
};
