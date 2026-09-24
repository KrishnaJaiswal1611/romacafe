const crypto = require('crypto');

function formatMoney(value) {
  return Number(value || 0).toFixed(2);
}

function roundMoney(value) {
  return Math.round((Number(value || 0) + Number.EPSILON) * 100) / 100;
}

function calculateNights(checkinDate, checkoutDate) {
  const checkin = new Date(checkinDate);
  const checkout = new Date(checkoutDate);
  const diffMs = checkout.getTime() - checkin.getTime();
  const nights = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  if (nights <= 0) throw new Error('Checkout date must be after checkin date.');
  return nights;
}

function generateDateList(startDate, endDate) {
  const dates = [];
  const start = new Date(startDate);
  const end = new Date(endDate);

  let cursor = new Date(start);
  while (cursor < end) {
    const iso = cursor.toISOString().slice(0, 10);
    dates.push(iso);
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

function validateDateString(value, label = 'date') {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`${label} must be in YYYY-MM-DD format.`);
  }

  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`${label} is invalid.`);
  }

  return value;
}

function verifyRazorpaySignature({ orderId, paymentId, razorpaySignature, secret }) {
  const generated = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return generated === razorpaySignature;
}

module.exports = {
  formatMoney,
  roundMoney,
  calculateNights,
  generateDateList,
  validateDateString,
  verifyRazorpaySignature,
};
