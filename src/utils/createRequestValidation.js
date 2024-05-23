const { body, validationResult } = require('express-validator');

const CreateRequestModelInput = [
  body('propertyType')
    .isIn(['VILLA', 'HOUSE', 'LAND', 'APARTMENT'])
    .withMessage(
      'Please provide a valid propertyType (VILLA, HOUSE, LAND, APARTMENT)'
    ),
  body('area').notEmpty().withMessage('Please provide an area'),
  body('price').isNumeric().withMessage('Please provide a valid price'),
  body('city').notEmpty().withMessage('Please provide a city'),
  body('district').notEmpty().withMessage('Please provide a district'),
  body('description').notEmpty().withMessage('Please provide a description'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = CreateRequestModelInput;
