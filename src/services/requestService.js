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
