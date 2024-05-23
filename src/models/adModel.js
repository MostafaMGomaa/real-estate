const mongoose = require('mongoose');
const commonSchema = require('./commonSchema');

const Ad = mongoose.model('Ad', commonSchema);

module.exports = Ad;
