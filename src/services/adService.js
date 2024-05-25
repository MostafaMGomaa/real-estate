const Ad = require('../models/adModel');
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
exports.createAd = async (data) => {
  return await Ad.create(data);
};
/**
 * 
 * @param {*} ad 
 * @returns 
 * 
 * Implement an endpoint that matches property requests with relevant ads based on district, price, and area.
  The endpoint should take an ad _id and return matching property requests, sorted by refreshedAt date descending.
  Include a price tolerance of +/- 10% in the matching system.
  example: if ad price is 100 then requests with price 90 to 110 will be matched
  Include pagination in the response using MongoDB aggregation with a single database call.
    - $ acet
  Ensure that the matching logic is efficient and can handle a large number of requests and ads (performance considerations)
    - Index and projections
 */

exports.findMatchesAds = async (ad, page, pageSize) => {
  // Include a price tolerance of +/- 10% in the matching system.
  page = parseInt(page, 10) || 1;
  pageSize = parseInt(pageSize, 10) || 10;

  const priceRange = { $gte: ad.price * 0.9, $lte: ad.price * 1.1 };

  const result = await Request.aggregate([
    /** Sorting and filtering all the letters first */
    { $match: { district: ad.district, area: ad.area, price: priceRange } },
    { $sort: { refreshedAt: -1 } },
    {
      /** This approach ensures that you get both the paginated data and the total count of matching documents in a single query. */
      $facet: {
        metadata: [{ $count: 'total' }],
        data: [
          { $skip: (page - 1) * pageSize },
          { $limit: pageSize },
          {
            $project: {
              _id: 1,
              district: 1,
              area: 1,
              price: 1,
              refreshedAt: 1,
            },
          },
        ],
      },
    },
  ]);

  const total = result[0].metadata[0]?.total || 0;
  const hasNextPage = page * pageSize < total;
  const hasPreviousPage = page > 1;

  return {
    data: result[0].data,
    total,
    page,
    pageSize,
    hasNextPage,
    hasPreviousPage,
  };
};
