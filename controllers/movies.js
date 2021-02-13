const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => { res.status(200).send(movies); })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailer, thumbnail, nameRU, nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner: req.user._id,
    nameRU,
    nameEN,
  })
    .then((movie) => { res.status(200).send(movie); })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (String(movie.owner) !== req.user._id) {
        return res.status(403).send({ massage: 'Нельзя удалять чужие фильмы' });
      }

      return Movie.findByIdAndRemove(req.params.movieId)
        .then(() => {
          res.send(movie);
        });
    })
    .catch(next);
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
