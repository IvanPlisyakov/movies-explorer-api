const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    id: Joi.string().required().regex(/^[0-9]*$/),
    country: Joi.string().required(),
    director: Joi.string().required(),
    year: Joi.string().required().regex(/^[0-9]*$/),
    description: Joi.string().required(),
    image: Joi.string().required().regex(/https?:\/\/w{0,3}[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*(gif|jpg|jpeg|tiff|png)\s*$/i),
    trailer: Joi.string().required().regex(/https?:\/\/w{0,3}[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*\s*$/i),
    thumbnail: Joi.string().required().regex(/https?:\/\/w{0,3}[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*(gif|jpg|jpeg|tiff|png)\s*$/i),
    nameRU: Joi.string().required().regex(/^[а-яёa-z0-9-<>«»._~:/?#[\]@!$&'()*+,;=\s\w]*$/i),
    nameEN: Joi.string().required().regex(/^[a-z0-9-._~:/?#[\]@!$&'()*+,;=\s\w]*$/i),
  }).unknown(true),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().min(24).max(24)
      .hex(),
  }).unknown(true),
}), deleteMovie);

module.exports = router;
