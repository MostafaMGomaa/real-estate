const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const AppError = require('../utils/appError');
const { createSendToken } = require('../services/authService');

exports.signup = asyncHandler(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    phone: req.body.phone,
    password: req.body.password,
  });
  // Remove passowrd from output
  newUser.password = undefined;

  createSendToken(newUser, 201, res);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { phone, password } = req.body;

  if (!phone || !password)
    return next(new AppError('Please provide phone and passoword', 400));

  // 1) Find user by phone
  const user = await User.findOne({ phone }).select('+password');

  // 2) Verify if user exists and input passsword is correct.
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Incorrect phone or password', 401));
  createSendToken(user, 200, res);
});

exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  //  Check if posted current password is correct.
  if (!(await user.correctPassword(req.body.currentPassword, user.password)))
    return next(new AppError(400, 'Current password is Wrong'));

  // update password.
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;
  await user.save();

  // Log user in, send JWT.
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'logout', {
    expires: new Date(Date.now() + 10000),
    htppOnly: true,
  });

  res.status(200).json({ status: 'success' });
};
