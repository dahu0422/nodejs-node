const fs = require('fs')
const express = require('express')
const morgan = require('morgan')
const app = express()

// 1.MiddleWare
app.use(express.json())

app.use(morgan('dev'))

app.use((req, res, next) => {
  console.log('Hello from the middleware')
  next()
})

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

// 2.Router Handler
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)
// 获取所有旅游数据
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: { tours },
  })
}

// 创建一条旅游数据
const createTour = (req, res) => {
  // console.log(req.body)

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
const getTour = (req, res) => {
  console.log(req.params)
  const id = req.params.id * 1
  const tour = tours.find((el) => el.id === id)

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      messgae: 'Invalid ID',
    })
  }

  res.status(200).json({
    status: 'success',
    data: { tour },
  })
}

// 修改某一条旅游数据
const updateTour = (req, res) => {
  console.log(req.params)
  const id = req.params.id * 1
  const tour = tours.find((el) => el.id === id)

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    })
  }

  Object.assign(tour, req.body)
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  })
}

// 删除某一条数据
const deleteTour = (req, res) => {
  const id = req.params.id * 1
  const tour = tours.find((el) => el.id === id)
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    })
  }

  res.status(204).json({
    status: 'success',
    data: null,
  })
}

// 获取所有用户信息
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 500,
    messgae: 'This route is not yet defined',
  })
}

// 创建新用户信息
const createUser = (req, res) => {
  res.status(500).json({
    status: 500,
    messgae: 'This route is not yet defined',
  })
}

// 查询某位用户信息
const getUser = (req, res) => {
  res.status(500).json({
    status: 500,
    messgae: 'This route is not yet defined',
  })
}

// 更新某位用户信息
const updateUser = (req, res) => {
  res.status(500).json({
    status: 500,
    messgae: 'This route is not yet defined',
  })
}

//  删除某位用户信息
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 500,
    messgae: 'This route is not yet defined',
  })
}

// 3.Routes
const tourRouter = express.Router()
const userRouter = express.Router()

tourRouter.route('/').get(getAllTours).post(createTour)
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)

userRouter.route('/').get(getAllUsers).post(createUser)
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

// 4.Start Server
const port = 3000
app.listen(port, () => {
  console.log(`App runing on port ${port}`)
})
