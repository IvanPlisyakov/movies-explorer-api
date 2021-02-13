const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const NotFoundError = require('../errors/not-found-err');
require('dotenv').config();

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret', { expiresIn: '7d' });//

      res.send({ token });
    })
    .catch(next);
};

const createUsers = (req, res, next) => {
  const { email } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return bcrypt.hash(req.body.password, 10)
          .then((hash) => User.create({
            email: req.body.email,
            password: hash, // записываем хеш в базу
          }))
          .then((readyUser) => {
            res.status(201).send(readyUser);
          })
          .catch(next);
      }

      return res.status(409).send({ message: 'Пользователь с таким email уже существует' });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => { res.status(200).send(users); })
    .catch(next);
};

const changeUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Данные об информации профиля не пришли');
      }

      res.status(200).send(user);
    })
    .catch(next);
};

module.exports = {
  createUsers, login, getUsers, changeUser,
};
