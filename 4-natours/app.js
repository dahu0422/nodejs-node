const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const globalErrorHandler = require('./controller/errorController');
const AppError = require('./utils/appError');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1.MiddleWare
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// LImit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMS: 60 * 60 * 1000,
  message: 'Too many requests from this IP, Please try again in an hour',
});
app.use('/api', limiter);

// Body parser, rending data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
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
