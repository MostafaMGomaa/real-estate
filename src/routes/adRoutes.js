const router = require('express').Router();
const AdController = require('../controllers/adController');
const { protect, restrictTo } = require('../services/authService');
const handleInputError = require('../utils/handleInputError');
const CreateCommonModelInput = require('../utils/validation/createCommonValidation');

router.post(
  '/',
  protect,
  restrictTo('AGENT'),
  CreateCommonModelInput,
  handleInputError,
  AdController.createAd
);

module.exports = router;
