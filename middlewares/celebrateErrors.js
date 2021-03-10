module.exports.celebrateErrors = (err, req, res, next) => {
  if (isCelebrate(err)) {
    return res.send({
      status: 400,
      message: err.joi.message,
      keys: err.joi.keys,
    });
  }

  return next(err);
};
