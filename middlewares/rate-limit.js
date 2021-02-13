const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
  message:
  'Too many accounts created from this IP address, please try again in 15 minutes',
});

module.exports = limiter;
