const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');


const centralizedErrorHandler = require('./errors/centralized-error-handler');
const { NotFoundErr } = require('./errors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(express.json()); // для собирания JSON-формата
app.use(express.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(requestLogger);
app.use(cors);

app.use(router);

app.use((req, res, next) => {
  next(new NotFoundErr('Не корректный путь'));
});

app.use(errorLogger);

app.use(errors());

app.use(centralizedErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});