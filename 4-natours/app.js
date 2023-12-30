const express = require('express');
const morgan = require('morgan');
const globalErrorHandler = require('./controller/errorController');
const AppError = require('./utils/appError');
const rateLimit = require('express-rate-limit');

const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// 1.MiddleWare
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 限制访问次数，防止暴力请求
const limiter = rateLimit({
  max: 100,
  windowMS: 60 * 60 * 1000,
  message: 'Too many requests from this IP, Please try again in an hour',
});
app.use('/api', limiter);

// 内置中间件
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
// 自定义中间件
app.use((req, res, next) => {
  // console.log(req.headers);
  req.requestTime = new Date().toISOString();
  next();
});

// 2.Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 匹配所有http请求方法，如果不是已定义路由，则创建appError实例，传入错误信息和状态吗404.
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} in this server`, 404));
});

// 错误处理中间件 Error Handling Middleware。
// Express 有默认的错误处理程序，如果是同步代码抛出问题，自动捕获。如果是中间件，通过next传出err会进入错误处理中间件。
app.use(globalErrorHandler);

module.exports = app;
