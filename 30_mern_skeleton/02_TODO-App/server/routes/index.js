const express = require('express');
const router = express.Router();

// 引入各个子路由
const postRoutes = require('./userRoutes');
router.use('/auth', postRoutes);

module.exports = router; // 导出的是 Router 对象，不是函数
