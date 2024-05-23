const router = require('express').Router();
const RequestController = require('../controllers/requestController');
const { protect, restrictTo } = require('../services/authService');
const handleInputError = require('../utils/handleInputError');
const CreateRequestModelInput = require('../utils/validation/createRequestValidation');
const UpdateRequestModelInput = require('../utils/validation/updateRequestValidation');

router.post(
  '/',
  protect,
  restrictTo('CLIENT'),
  CreateRequestModelInput,
  handleInputError,
  RequestController.createRequest
);

router.patch(
  '/:id',
  protect,
  restrictTo('CLIENT'),
  UpdateRequestModelInput,
  handleInputError,
  RequestController.updateRequest
);

module.exports = router;
