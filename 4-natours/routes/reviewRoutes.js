const express = require('express');
const { protect, restrictTo } = require('../controller/authController');

const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
} = require('../controller/reviewController.js');

const router = express.Router({ mergeParams: true }); // 保留来自父路由的req.params值

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), setTourUserIds, createReview);

router.route('/:id').get(getReview).patch(updateReview).delete(deleteReview);

module.exports = router;
