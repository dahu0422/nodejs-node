const Tour = require('./../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require('./handlerFactory');

// 获取Top5的旅游数据
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,duration,price,ratingsAverage,summary,difficulty';
  next();
};

// 获取所有旅游数据
exports.getAllTours = getAll(Tour);
// 创建一条旅游数据
exports.createTour = createOne(Tour);
// 查询某一条旅游数据
exports.getTour = getOne(Tour, { path: 'reviews' });
// 修改某一条旅游数据
exports.updateTour = updateOne(Tour);
// 删除某一条数据
exports.deleteTour = deleteOne(Tour);

// 获取统计数据
exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    { $match: { ratingsAverage: { $gte: 4.5 } } }, // 过滤平均分大于等于4.5的数据，并传给$group，group会将他们分组。
    {
      $group: {
        _id: { $toUpper: '$difficulty' }, // 按照困难程度进行分组
        numTours: { $sum: 1 },
        numRatings: { $sum: 'ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    { $sort: { avgPrice: 1 } }, // 按照平均价降序排列
    // { $match: { _id: { $ne: 'EASY' } } }, // 排除EASY的
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

// 获取年度每个月开展的旅游数据
exports.getMountlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;

  const plan = await Tour.aggregate([
    { $unwind: '$startDates' }, // 解构startDates字段
    // 查询日期在21-01-01 12-31之间的数据
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    // 按照月份分组，统计每个月有多少活动，以及他们的名字分别是什么
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    // 添加字段
    { $addFields: { month: '$_id' } },
    // 移除字段
    { $project: { _id: 0 } },
    // 按照数量降序排列
    { $sort: { numTourStarts: -1 } },
    // 限制返回个数
    { $limit: 12 },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
});
