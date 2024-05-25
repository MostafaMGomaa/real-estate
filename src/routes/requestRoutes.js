const router = require('express').Router();
const RequestController = require('../controllers/requestController');
const { protect, restrictTo } = require('../services/authService');
const handleInputError = require('../utils/handleInputError');
const CreateCommonModelInput = require('../utils/validation/createCommonValidation');
const UpdateCommonModelInput = require('../utils/validation/updateCommanValidation');

router.post(
  '/',
  protect,
  restrictTo('CLIENT', 'ADMIN'),
  CreateCommonModelInput,
  handleInputError,
  RequestController.createRequest
);

router.patch(
  '/:id',
  protect,
  restrictTo('CLIENT', 'ADMIN'),
  UpdateCommonModelInput,
  handleInputError,
  RequestController.updateRequest
);

module.exports = router;
