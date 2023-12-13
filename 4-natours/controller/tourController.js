const Tour = require('./../models/tourModel');

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

// 获取所有旅游数据
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // data: { tours },
  });
};

// 创建一条旅游数据
exports.createTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // data: { tours },
  });
};

// 查询某一条旅游数据
exports.getTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // data: { tours },
  });
};

// 修改某一条旅游数据
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // data: { tours },
  });
};

// 删除某一条数据
exports.deleteTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // data: { tours },
  });
};
