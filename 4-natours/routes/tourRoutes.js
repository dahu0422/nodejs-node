const express = require('express')
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
} = require('../controller/tourController')

const router = express.Router()

// 第一个参数是应捕获的 URL 参数的名称，第二个参数可以是任何可能用于返回中间件实现的 JavaScript 对象。
router.param('id', checkID)

router.route('/').get(getAllTours).post(checkBody, createTour)
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)

module.exports = router
