const User = require('../models/userModel.js');
const catchAsync = require('../utils/catchAsync.js');

// 获取所有用户信息
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 200,
    data: {
      users,
    },
  });
});

// 创建新用户信息
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 500,
    messgae: 'This route is not yet defined',
  });
};

// 查询某位用户信息
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 500,
    messgae: 'This route is not yet defined',
  });
};

// 更新某位用户信息
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 500,
    messgae: 'This route is not yet defined',
  });
};

//  删除某位用户信息
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 500,
    messgae: 'This route is not yet defined',
  });
};
