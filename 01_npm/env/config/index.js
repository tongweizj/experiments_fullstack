require('dotenv').config(); // 确保加载了变量

const config = {
  port: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = config;