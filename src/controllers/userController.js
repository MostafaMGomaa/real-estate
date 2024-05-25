const asyncHandler = require('express-async-handler');
const { getUsersStats } = require('../services/userService');

exports.getUserStatistics = asyncHandler(async (req, res, next) => {
  const { page = 1, pageSize = 10 } = req.query;

  const usersStatistics = await getUsersStats(page, pageSize);

  if (usersStatistics.length === 0) {
    return res.status(404).json({ message: 'No users found' });
  }

  const total = usersStatistics[0].metadata[0]?.total || 0;

  res.status(200).json({
    data: usersStatistics[0].data,
    total,
    page: parseInt(page),
    pageSize: parseInt(pageSize),
  });
});
