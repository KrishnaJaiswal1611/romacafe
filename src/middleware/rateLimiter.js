const rateLimit = require('express-rate-limit');

const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many booking attempts. Please try again later.',
  },
  skipSuccessfulRequests: false,
});

const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many payment requests. Please wait a moment and retry.',
  },
  skipSuccessfulRequests: false,
});

module.exports = {
  bookingLimiter,
  paymentLimiter,
};
