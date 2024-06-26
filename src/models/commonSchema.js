const mongoose = require('mongoose');

const commonSchema = new mongoose.Schema(
  {
    propertyType: {
      type: String,
      enum: ['VILLA', 'HOUSE', 'LAND', 'APARTMENT'],
      required: [true, 'Please provive a propertyType'],
    },
    area: {
      type: String,
      required: [true, 'Please provive an area'],
    },
    price: {
      type: Number,
      required: [true, 'Please provive a price'],
    },
    city: {
      type: String,
      required: [true, 'Please provive a city'],
    },
    district: {
      type: String,
      required: [true, 'Please provive a district'],
    },
    description: {
      type: String,
      required: [true, 'Please provive a description'],
    },
    refreshedAt: {
      type: Date,
      default: Date.now(),
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

commonSchema.index({ district: 1, area: 1, price: 1, refreshedAt: -1 });

module.exports = commonSchema;
