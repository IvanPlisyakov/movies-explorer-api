const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, changeUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    name: Joi.string().required().min(2).max(30),
  }).unknown(true),
}), changeUser);

module.exports = router;
