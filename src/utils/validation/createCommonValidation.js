const { body, validationResult } = require('express-validator');

const CreateCommonModelInput = [
  body('propertyType')
    .trim()
    .isIn(['VILLA', 'HOUSE', 'LAND', 'APARTMENT'])
    .withMessage(
      'Please provide a valid propertyType (VILLA, HOUSE, LAND, APARTMENT)'
    ),
  body('area').trim().notEmpty().withMessage('Please provide an area'),
  body('city').trim().notEmpty().withMessage('Please provide a city'),
  body('district').trim().notEmpty().withMessage('Please provide a district'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Please provide a description'),
  body('price').trim().isNumeric().withMessage('Please provide a valid price'),

  /** To accept only number  */
  //   body('price')
  //     .optional()
  //     .custom((value) => {
  //       if (typeof value !== 'number') {
  //         throw new Error('Please provide a valid price');
  //       }
  //       return true;
  //     }),
  //   (req, res, next) => {
  //     const errors = validationResult(req);
  //     if (!errors.isEmpty()) {
  //       return res.status(400).json({ errors: errors.array() });
  //     }
  //     next();
  //   },
];

module.exports = CreateCommonModelInput;
