const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token === undefined) {
    res.json({status: 404, data: {msg: 'Token non trouvé'}})
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.json({status: 401, data: {msg: 'Token non valide !!!'}})
      } else {
        req.body._id = decoded.id;
        next();
      }
    })
  }
}