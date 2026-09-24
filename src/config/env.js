require('dotenv').config();

const env = {
  PORT: process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  RAZORPAY_WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET,
  ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_FROM_NUMBER: process.env.TWILIO_FROM_NUMBER,
  CANCELLATION_FULL_REFUND_HOURS: Number(process.env.CANCELLATION_FULL_REFUND_HOURS || 48),
  CANCELLATION_PARTIAL_REFUND_PERCENT: Number(process.env.CANCELLATION_PARTIAL_REFUND_PERCENT || 50),
};

for (const [key, value] of Object.entries(env)) {
  if (key.includes('SECRET') || key.includes('KEY') || key.includes('TOKEN')) {
    if (!value) {
      console.warn(`Missing env var for: ${key}`);
    }
  }
}

module.exports = env;
