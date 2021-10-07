const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, changeUser, getUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    name: Joi.string().required().min(2).max(30),
  }).unknown(true),
}), changeUser);

module.exports = router;
