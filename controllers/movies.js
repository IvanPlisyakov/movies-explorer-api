const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const CommonError = require('../errors/common-err');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => { res.status(200).send(movies); })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    id, country, director, duration, year, description, image, trailer, thumbnail, nameRU, nameEN,
  } = req.body;
  Movie.findOne({ id })
    .then((movie) => {
      if (!movie) {
        return Movie.create({
          id,
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
          .then((readyMovie) => {
            // console.log(readyMovie);
            return res.status(200).send(readyMovie);
          })
          .catch(next);
      }

      throw new CommonError('Such a film already exists', 409);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (String(movie.owner) !== req.user._id) {
        throw new CommonError("You can't delete other people's movies", 403);
      }

      return Movie.findByIdAndRemove(req.params.movieId)
        .then(() => {
          res.status(200).send(movie);
        });
    })
    .catch(next);
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
