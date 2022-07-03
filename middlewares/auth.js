const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorizedError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new Unauthorized('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, 'somekey');
  } catch (err) {
    throw new Unauthorized('Необходима авторизация');
  }
  req.user = payload;

  next();
};
