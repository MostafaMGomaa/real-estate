const User = require('../models/userModel');

exports.getUsersStats = async (page, pageSize) => {
  const pipeline = [
    {
      $match: { role: { $in: ['CLIENT', 'AGENT'] } },
    },
    {
      $lookup: {
        from: 'ads',
        localField: '_id',
        foreignField: 'user',
        as: 'ads',
      },
    },
    {
      $lookup: {
        from: 'requests',
        localField: '_id',
        foreignField: 'user',
        as: 'requests',
      },
    },
    {
      $addFields: {
        totalAds: { $size: '$ads' },
        totalRequests: { $size: '$requests' },
      },
    },
    {
      $project: {
        name: 1,
        role: 1,
        totalAds: 1,
        totalRequests: 1,
      },
    },
    {
      $facet: {
        metadata: [{ $count: 'total' }],
        data: [
          { $skip: (parseInt(page) - 1) * parseInt(pageSize) },
          { $limit: parseInt(pageSize) },
        ],
      },
    },
  ];

  const usersStatistics = await User.aggregate(pipeline);
  return usersStatistics;
};
