const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const Tour = require('./../models/tourModel');
const AppError = require('../utils/appError');

// 获取Top5的旅游数据
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,duration,price,ratingsAverage,summary,difficulty';
  next();
};

// 获取所有旅游数据
exports.getAllTours = catchAsync(async (req, res, next) => {
  // EXECUTE QUERY
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFiedlds()
    .pagination();
  const tours = await features.query;

  //SEND RESPONSE
  res.status(200).json({
    status: 'success',
    resule: tours.length,
    data: { tours },
  });
});

// 创建一条旅游数据
exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(200).json({
    status: 'success',
    data: { newTour },
  });
});

// 查询某一条旅游数据
exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id); // 根据id查找
  if (!tour) {
    return next(new AppError('No tour found with that IP', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { tour },
  });
});

// 修改某一条旅游数据
exports.updateTour = catchAsync(async (req, res, next) => {
  // 找到并修改这条数据，返回修改后的对象
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!tour) {
    return next(new AppError('No tour found with that IP', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { tour },
  });
});

// 删除某一条数据
exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  if (!tour) {
    return next(new AppError('No tour found with that IP', 404));
  }
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

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
