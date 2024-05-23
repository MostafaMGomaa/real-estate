const mongoose = require('mongoose');
const commonSchema = require('./commonSchema');

const Request = mongoose.model('Request', commonSchema);

module.exports = Request;
