const asyncHandler = require('express-async-handler');

const Ad = require('../models/adModel');
const { createAd, findMatchesAds } = require('../services/adService');

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

exports.matchAds = asyncHandler(async (req, res, next) => {
  let { page, pageSize } = req.query;

  const ad = await Ad.findById(req.params.id);
  if (!ad) {
    return res.status(404).send();
  }
  const { data, total, hasNextPage, hasPreviousPage } = await findMatchesAds(
    ad,
    page,
    pageSize
  );

  res.status(200).send({
    data,
    total,
    page,
    pageSize,
    hasNextPage,
    hasPreviousPage,
  });
});
