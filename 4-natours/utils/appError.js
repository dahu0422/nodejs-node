class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // 代表用户操作问题

    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;
