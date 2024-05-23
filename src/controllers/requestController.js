const asyncHandler = require('express-async-handler');
const { createRequest, updateRequest } = require('../services/requestService');

exports.createRequest = asyncHandler(async (req, res, next) => {
  const result = await createRequest({
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

exports.updateRequest = asyncHandler(async (req, res, next) => {
  const result = await updateRequest(req.params.id, {
    area: req.body.area,
    price: req.body.price,
    description: req.body.description,
  });

  res.status(201).send({ data: result });
});
