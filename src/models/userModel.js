const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name!'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide your phone number'],
      unique: true,
      lowercase: true,
      validate: [
        validator.isMobilePhone,
        'Please provide a valid phone number',
      ],
    },
    role: {
      type: String,
      enum: ['CLIENT', 'AGENT', 'ADMIN'],
      default: 'CLIENT',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'DELETED'],
      default: 'ACTIVE',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre('save', async function (next) {
  // Check if user doesn't modify his password.
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

/**
 * @param { User input } candidatePassword
 * @param { Acutally user passoword } userPassword
 * @returns boolean
 * We cannot say this.password instead of userPassword because we this.passoword select: false
 */
userSchema.methods.correctPassword = async (
  candidatePassword,
  userPassword
) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.virtual('ads', {
  ref: 'Ad',
  foreignField: 'user',
  localField: '_id',
});

userSchema.virtual('requests', {
  ref: 'Request',
  foreignField: 'user',
  localField: '_id',
});

const User = mongoose.model('User', userSchema);

module.exports = User;
