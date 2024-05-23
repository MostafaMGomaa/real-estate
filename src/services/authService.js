const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { promisify } = require('util');
const asyncHandler = require('express-async-handler');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECERT, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
  };
  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.protect = asyncHandler(async (req, res, next) => {
  /**
   * Token will sent with header called "Authorization" .
   */
  // Getting token and check if it exists.
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token)
    return next(
      new AppError('You are not logged in! Please login for get access', 401)
    );

  // Verification token
  /**
   * We promisfy verify fn beacuase all project deal with promises and to treat fn as async fn.
   * We can use callback fn with verify BTW.
   */

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECERT);

  // Check the use if still exists.
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(
      new AppError('The token beloning to this user does not exists', 401)
    );
  }

  // Give access to user and sent his data with req obj and locals vars
  req.user = user;
  res.locals.user = user;

  next();
});

/**
 * @param  {...String users roles which allows to access this endpoint} roles
 * @returns AppError if user cann't go there.
 */
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError(`You can't do this action as ${req.user.role}`, 403)
      );

    next();
  };
};
