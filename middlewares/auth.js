const jwt = require('jsonwebtoken');
const CommonError = require('../errors/common-err');
require('dotenv').config();

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new CommonError('Необходима авторизация', 401);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'dev-secret');// process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret'
  } catch (err) {
    throw new CommonError('Необходима авторизация', 401);
  }

  req.user = payload;

  return next();
};
