const mongoose = require('mongoose');
// const validator = require('validator');

const movieSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /https?:\/\/w{0,3}[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*(gif|jpg|jpeg|tiff|png)\s*$/i;
        return regex.test(v);
      },
      message: 'Неправильная ссылка на картинку.',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /https?:\/\/w{0,3}[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*\s*$/i;
        return regex.test(v);
      },
      message: 'Неправильная ссылка.',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /https?:\/\/w{0,3}[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*\s*$/i;
        return regex.test(v);
      },
      message: 'Неправильная ссылка на картинку.',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /[а-я]*\s*$/i;
        return regex.test(v);
      },
      message: 'Неправильный текст.',
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /[a-z]*\s*$/i;
        return regex.test(v);
      },
      message: 'Неправильный текст.',
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
