const asyncHandler = require('express-async-handler');
const { getUsersStats } = require('../services/userService');

exports.getUserStatistics = asyncHandler(async (req, res, next) => {
  const { page = 1, pageSize = 10 } = req.query;

  const usersStatistics = await getUsersStats(page, pageSize);

  const total = usersStatistics[0].metadata[0]?.total || 0;
  const hasNextPage = page * pageSize < total;
  const hasPreviousPage = page > 1;

  res.status(200).json({
    data: usersStatistics[0].data,
    total,
    page: parseInt(page),
    pageSize: parseInt(pageSize),
    hasNextPage,
    hasPreviousPage,
  });
});
