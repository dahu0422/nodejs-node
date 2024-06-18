const Review = require('../models/reviewModel.js');
const catchAsync = require('../utils/catchAsync.js');
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require('./handlerFactory.js');

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

// 查询评论
exports.getAllReviews = getAll(Review);
// 查询某条评论
exports.getReview = getOne(Review);
// 创建评论
exports.createReview = createOne(Review);
// 更新评论
exports.updateReview = updateOne(Review);
// 删除评论
exports.deleteReview = deleteOne(Review);
