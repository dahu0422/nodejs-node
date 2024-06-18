const express = require('express');
const { protect, restrictTo } = require('../controller/authController');

const {
  getAllReviews,
  createReview,
} = require('../controller/reviewController.js');

const router = express.Router();

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), createReview);

module.exports = router;
