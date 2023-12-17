const APIFeatures = require('../utils/apiFeatures');
const Tour = require('./../models/tourModel');

// 获取Top5的旅游数据
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,duration,price,ratingsAverage,summary,difficulty';
  next();
};

// 获取所有旅游数据
exports.getAllTours = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

// 创建一条旅游数据
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: 'success',
      data: { newTour },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Invaild data send!',
    });
  }
};

// 查询某一条旅游数据
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id); // 根据id查找
    // Tour.findOne({_id: req.params.id})

    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

// 修改某一条旅游数据
exports.updateTour = async (req, res) => {
  try {
    // 找到并修改这条数据，返回修改后的对象
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error,
    });
  }
};

// 删除某一条数据
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    req.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

// 获取统计数据
exports.getTourStats = async (req, res) => {
  try {
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
    res.status(200).send({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: error,
    });
  }
};
