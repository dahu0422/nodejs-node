const express = require('express');
const {
  aliasTopTours,
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  getTourStats,
  getMountlyPlan,
} = require('../controller/tourController');
const { protect, restrictTo } = require('../controller/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

// Post tourId/reviews
router.use('/:tourId/reviews', reviewRouter);

router.route('/alias-5-cheap').get(aliasTopTours, getAllTours);
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMountlyPlan);

router.route('/').get(protect, getAllTours).post(createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
