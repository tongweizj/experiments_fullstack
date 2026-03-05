const express = require('express');
const router = express.Router();
// 引入控制器
const authController = require('../controllers/authController');

// 定义路由：路径 + 控制器函数
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/verify', authController.verify);

module.exports = router;
