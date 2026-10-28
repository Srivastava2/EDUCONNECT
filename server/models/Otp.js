const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema(
  {
    target: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ['email', 'phone'],
      required: true
    },
    code: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300 // Auto delete document after 5 minutes (TTL index)
    }
  }
);

module.exports = mongoose.model('Otp', otpSchema);
