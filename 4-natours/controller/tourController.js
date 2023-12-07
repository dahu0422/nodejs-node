const fs = require('fs')

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
)

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`)
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      messgae: 'Invalid ID',
    })
  }
  next()
}

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    })
  }
  next()
}

// 获取所有旅游数据
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: { tours },
  })
}

// 创建一条旅游数据
exports.createTour = (req, res) => {
  // console.log(req.body)
  const id = req.params.id * 1
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id: newId }, req.body)

  tours.push(newTour)
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: { tour: newTour },
      })
    }
  )
}

// 查询某一条旅游数据
exports.getTour = (req, res) => {
  const id = req.params.id * 1
  const tour = tours.find((el) => el.id === id)
  res.status(200).json({
    status: 'success',
    data: { tour },
  })
}

// 修改某一条旅游数据
exports.updateTour = (req, res) => {
  const id = req.params.id * 1
  const tour = tours.find((el) => el.id === id)
  Object.assign(tour, req.body)
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  })
}

// 删除某一条数据
exports.deleteTour = (req, res) => {
  const id = req.params.id * 1
  const tour = tours.find((el) => el.id === id)
  res.status(204).json({
    status: 'success',
    data: null,
  })
}
