const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const routers = require('./routes/index.js');

const limiter = require('./middlewares/rate-limit');
const { centarlErrors } = require('./middlewares/central-errors');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 80 } = process.env;
const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cors());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(bodyParser.json());
app.use('/', routers);
app.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});
app.use(errorLogger);
app.use(errors());
app.use(centarlErrors);

app.listen(PORT);
