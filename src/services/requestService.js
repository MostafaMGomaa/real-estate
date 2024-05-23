const Request = require('../models/requestModel');
/**
 *
 * @param {
 *  propertyType: string,
 *   area: string,
 *   price: number,
 *   city: string,
 *   district: string,
 *   description: string,
 *   refreshedAt: date,
 *  }
 * @returns obj
 */
exports.createRequest = async (data) => {
  return await Request.create(data);
};

/**
 *
 * @param {ObjectId} id
 * @param {*} data
 * @returns object
 */
exports.updateRequest = async (id, data) => {
  return await Request.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};
