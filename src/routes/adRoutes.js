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

// Endpoint to match property requests with an ad
router.get(
  '/ads/:id/matches',
  authenticate,
  authorize('CLIENT'),
  AdController.matchAds
);

module.exports = router;
