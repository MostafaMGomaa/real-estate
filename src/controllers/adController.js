const asyncHandler = require('express-async-handler');
const { createAd } = require('../services/adService');

exports.createAd = asyncHandler(async (req, res, next) => {
  const result = await createAd({
    propertyType: req.body.propertyType,
    area: req.body.area,
    price: req.body.price,
    city: req.body.city,
    district: req.body.district,
    description: req.body.description,
    userId: req.user.id,
  });

  res.status(201).send({ data: result });
});
