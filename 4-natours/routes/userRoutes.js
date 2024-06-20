const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
} = require('../controller/userController');

const {
  signup,
  login,
  protect,
  forgetPassword,
  resetPassword,
  updatePassword,
  restrictTo,
} = require('../controller/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// Protect all routes after this middleware 路由保护
router.use(protect);

router.post('/forgetPassword', forgetPassword);
router.patch('/resetPassword/:token', resetPassword);
router.get('/me', getMe, getUser);
router.patch('/updateMyPassword', updatePassword);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);

router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
