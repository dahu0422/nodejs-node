const express = require('express');
const { protect, restrictTo } = require('../controller/authController');

const {
  getAllReviews,
  createReview,
} = require('../controller/reviewController.js');

const router = express.Router({ mergeParams: true }); // 保留来自父路由的req.params值

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), createReview);

module.exports = router;
