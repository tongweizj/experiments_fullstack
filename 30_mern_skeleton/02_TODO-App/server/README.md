## Project Init

```
npm init -y
npm i express jsonwebtoken cookie-parser cors nodemon
npm install dotenv
```


```
server/
├── config/             # 配置中心
│   ├── db.js           # 数据库连接 (Mongoose/Sequelize)
│   └── index.js        # 环境变量导出 (刚才我们重构的部分)
├── controllers/        # 控制器 (业务逻辑层)
│   ├── postController.js # 处理博客文章的增删改查逻辑
│   └── authController.js # 处理注册、登录逻辑
├── middleware/         # 中间件 (拦截器层)
│   ├── auth.js         # JWT 验证权限
│   └── errorLoader.js  # 统一错误处理
├── models/             # 模型层 (数据结构)
│   ├── Post.js         # 博客文章 Schema
│   └── User.js         # 用户 Schema
├── routes/             # 路由层 (路径定义)
│   ├── postRoutes.js   # 定义 /api/posts 相关路径
│   ├── userRoutes.js   # 定义 /api/users 相关路径
│   └── index.js        # 路由总入口
├── utils/              # 工具库 (通用函数)
│   └── catchAsync.js   # 捕捉异步错误的包装函数
├── .env                # 环境变量 (不进入 Git)
├── .gitignore          # 忽略文件
├── app.js              # Express 应用配置 (中间件挂载)
├── server.js           # 程序启动入口
└── package.json
```