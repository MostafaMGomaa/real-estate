const Ad = require('../models/adModel');

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
exports.createAd = async (data) => {
  return await Ad.create(data);
};
