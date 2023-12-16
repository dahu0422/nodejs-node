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
    // BUILD QUERY
    // 1A) filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'limit', 'sort', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) advanced filtering
    let queryStr = JSON.stringify(queryObj);
    // 替换所有 gte、gt、lt、lte
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);
    let query = Tour.find(JSON.parse(queryStr));

    // 2) sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // 3) Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 4) pagination
    const page = req.query.page || 1;
    const limit = req.query.limit || 100;
    const skip = (page - 1) * limit;

    if (req.query.page) {
      const numTours = await Tour.countDocuments(); // 查询collection下数据总条数
      if (skip >= numTours) throw new Error('This page does not exit');
    }

    query = query.skip(skip).limit(limit);

    // EXECUTE QUERY
    const tours = await query;

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
