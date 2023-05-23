const centralizedErrorHandler = (err, req, res, next) => {
  console.log(err);
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? 'Сервер недоступен' : message });

  next();
};

module.exports = centralizedErrorHandler;