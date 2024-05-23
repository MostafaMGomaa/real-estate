const { body, validationResult } = require('express-validator');

const UpdateCommonModelInput = [
  body('price')
    .optional()
    .isNumeric()
    .withMessage('Please provide a valid price'),

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

module.exports = UpdateCommonModelInput;
