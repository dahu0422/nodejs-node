const User = require('../models/userModel.js');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync.js');
const { deleteOne, updateOne, getOne, getAll } = require('./handlerFactory.js');

const filterObj = (obj, ...allowFields) => {
  const newObj = {};
  Object.keys(obj).forEach((x) => {
    if (allowFields.includes(x)) newObj[x] = obj[x];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

// 更新用户信息
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400,
      ),
    );
  }
  // 2) Filtered out unwanted fields names that are not allowed to be update
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3) Update user document
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    user: updateUser,
  });
});

// 软删除用户，将active修改为false，查询时不筛选出来。
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// 获取所有用户信息
exports.getAllUsers = getAll(User);

// 创建新用户信息
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 500,
    messgae: 'This route is not yet defined',
  });
};

// 查询某位用户信息
exports.getUser = getOne(User);
// 更新某位用户信息，不包括密码
exports.updateUser = updateOne(User);
//  删除某位用户信息
exports.deleteUser = deleteOne(User);
