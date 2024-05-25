const router = require('express').Router();

const { signup, login, logout } = require('../controllers/authController');
const { protect, restrictTo } = require('../services/authService');
const { getUserStatistics } = require('../controllers/userController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

router.get('/statistics', protect, restrictTo('ADMIN'), getUserStatistics);

module.exports = router;
