const Review = require('../models/reviewModel.js');
const catchAsync = require('../utils/catchAsync.js');

// 查询评论
exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: 'success',
    data: { reviews },
  });
});

// 创建评论
exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { newReview },
  });
});
