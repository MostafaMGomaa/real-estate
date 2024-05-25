const router = require('express').Router();
const AdController = require('../controllers/adController');
const { protect, restrictTo } = require('../services/authService');
const handleInputError = require('../utils/handleInputError');
const CreateCommonModelInput = require('../utils/validation/createCommonValidation');

router.post(
  '/',
  protect,
  restrictTo('AGENT', 'ADMIN'),
  CreateCommonModelInput,
  handleInputError,
  AdController.createAd
);

// Endpoint to match property requests with an ad
router.get(
  '/:id/matches',
  protect,
  restrictTo('AGENT', 'ADMIN'),
  AdController.matchAds
);

module.exports = router;
