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
        foreignField: 'userId',
        as: 'ads',
      },
    },
    {
      $lookup: {
        from: 'requests',
        localField: '_id',
        foreignField: 'userId',
        as: 'requests',
      },
    },

    {
      $project: {
        _id: 1,
        name: 1,
        role: 1,
        adsCount: { $size: '$ads' },
        totalAdsAmount: { $sum: '$ads.price' },
        requestsCount: { $size: '$requests' },
        totalRequestsAmount: { $sum: '$requests.price' },
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
