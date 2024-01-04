const jwt = require('jsonwebtoken');
secretKey = "mahesh"

function authenticateToken(req, res, next) {
    // console.log(req.cookies.token)
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;