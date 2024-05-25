const router = require('express').Router();
const { generateSampleData } = require('../controllers/fakerController');

router.post('/', generateSampleData);

module.exports = router;
