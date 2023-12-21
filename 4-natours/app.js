const express = require('express');
const morgan = require('morgan');

const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// 1.MiddleWare
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2.Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} in this server`,
  // });

  const err = new Error(`Can't find ${req.originalUrl} in this server`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});

// 错误处理中间件 Error Handling Middleware。
// Express 有默认的错误处理程序，如果是同步代码抛出问题，自动捕获。如果是中间件，通过next传出err会进入错误处理中间件。
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    statusCode: err.statusCode,
  });
});

module.exports = app;
