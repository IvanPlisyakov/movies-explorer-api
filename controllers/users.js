const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const NotFoundError = require('../errors/not-found-err');
const CommonError = require('../errors/common-err');
require('dotenv').config();

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'dev-secret', { expiresIn: '7d' });// process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret'

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
            name: req.body.name,
            email: req.body.email,
            password: hash, // записываем хеш в базу
          }))
          .then((readyUser) => {
            res.status(201).send({ email: readyUser.email, name: readyUser.name });
          })
          .catch(next);
      }

      throw new CommonError('A user with this email already exists', 409);
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => { res.status(200).send(users); })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('There is no user with this id');
      }

      res.status(200).send(user);
    })
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
        throw new NotFoundError('Data about the profile information was not received');
      }

      res.status(200).send(user);
    })
    .catch(next);
};

module.exports = {
  createUsers, login, getUsers, getUser, changeUser,
};
