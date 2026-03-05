require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const config = {
  env: env,
  isDevelopment: env === 'development',
  isProduction: env === 'production',
  isTest: env === 'test',
  port: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  SESSION_SECRET: process.env.SESSION_SECRET,
  MONGO_URI: process.env.MONGO_URI,
};

module.exports = config;
