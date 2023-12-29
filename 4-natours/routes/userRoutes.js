const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controller/userController');

const {
  signup,
  login,
  forgetPassword,
  resetPassword,
} = require('../controller/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgetpassword', forgetPassword);
router.patch('/resetpassword/:token', resetPassword);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
