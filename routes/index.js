const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  login, createUsers,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth.js');
const routerMovies = require('./movies.js');
const routerUsers = require('./users.js');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUsers);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required().min(8),
  }),
}), login);
router.use('/movies', auth, routerMovies);
router.use('/users', auth, routerUsers);
router.use(/\//, auth);

module.exports = router;
