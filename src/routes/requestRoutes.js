const router = require('express').Router();
const { createRequest } = require('../controllers/requestController');
const { protect, restrictTo } = require('../services/authService');
const handleInputError = require('../utils/handleInputError');
const CreateRequestModelInput = require('../utils/createRequestValidation');

router.post(
  '/',
  protect,
  restrictTo('CLIENT'),
  CreateRequestModelInput,
  handleInputError,
  createRequest
);

module.exports = router;
