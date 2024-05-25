const { faker } = require('@faker-js/faker');

const User = require('../models/userModel');
const Request = require('../models/requestModel');
const Ad = require('../models/adModel');

const asyncHandler = require('express-async-handler');

exports.generateSampleData = asyncHandler(async (req, res, next) => {
  // Clear existing data
  await User.deleteMany({});
  await Request.deleteMany({});
  await Ad.deleteMany({});

  // Create users
  const client = new User({
    name: faker.internet.userName(),
    phone: '+201111111111',
    role: 'CLIENT',
    status: 'ACTIVE',
    password: 'password',
  });
  const agent = new User({
    name: faker.internet.userName(),
    phone: '+201111111112',
    role: 'AGENT',
    status: 'ACTIVE',
    password: 'password',
  });
  const admin = new User({
    name: faker.internet.userName(),
    phone: '+201111111113',
    role: 'ADMIN',
    status: 'ACTIVE',
    password: 'password',
  });
  await client.save({ validateBeforeSave: true });
  await agent.save({ validateBeforeSave: true });
  await admin.save({ validateBeforeSave: true });

  // Create property requests
  for (let i = 0; i < 10; i++) {
    const propertyRequest = new Request({
      propertyType: faker.helpers.arrayElement([
        'VILLA',
        'HOUSE',
        'LAND',
        'APARTMENT',
      ]),
      area: faker.helpers.rangeToNumber({ min: 50, max: 500 }),
      price: faker.helpers.rangeToNumber({ min: 100000, max: 1000000 }),
      city: faker.location.city(),
      district: faker.location.county(),
      description: faker.lorem.sentences(),
      refreshedAt: faker.date.recent(),
      user: client._id,
    });
    await propertyRequest.save({ validateBeforeSave: true });
  }

  // Create ads
  for (let i = 0; i < 10; i++) {
    const ad = new Ad({
      propertyType: faker.helpers.arrayElement([
        'VILLA',
        'HOUSE',
        'LAND',
        'APARTMENT',
      ]),
      area: faker.helpers.rangeToNumber({ min: 50, max: 500 }),
      price: faker.helpers.rangeToNumber({ min: 1000, max: 10000 }),
      city: faker.location.city(),
      district: faker.location.county(),
      description: faker.lorem.sentences(),
      user: agent._id,
    });
    await ad.save({ validateBeforeSave: true });
  }

  res.status(201).json({
    message: 'Sample data generated successfully.',
  });
});
