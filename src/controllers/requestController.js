const asyncHandler = require('express-async-handler');
const { createRequest } = require('../services/requestService');

exports.createRequest = asyncHandler(async (req, res, next) => {
  const result = await createRequest({
    propertyType: req.body.propertyType,
    area: req.body.area,
    price: req.body.price,
    city: req.body.city,
    district: req.body.district,
    description: req.body.description,
  });

  res.status(201).send({ data: result });
});
