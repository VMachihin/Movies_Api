const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const limiter = require('./utils/limiter');
const router = require('./routes');

const centralizedErrorHandler = require('./errors/centralized-error-handler');
const dataBaseServer = require('./utils/database-server');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const app = express();
const { NODE_ENV, PORT = 3000 } = process.env;

if (NODE_ENV !== 'production') {
  mongoose.connect(dataBaseServer);
}

app.use(helmet());

app.use(express.json()); // для собирания JSON-формата
app.use(express.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(requestLogger);
app.use(cors);

app.use(limiter);
app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(centralizedErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
