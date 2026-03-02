// user.resolvers.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.server.model.js';

const JWT_SECRET = 'some_secret_key';

const userResolvers = {
  Query: {
    users: async () => await UserModel.find(),
    user: async (_, { id }) => await UserModel.findById(id),
    isLoggedIn: (_, __, { req }) => {
      // 即使中间件没挂载成功，我们直接看 req 对象里是否有 user
      // 或者直接在 resolver 里判断 cookie
      return !!(req.user || req.cookies?.token);
    },
  },
  Mutation: {
    createUser: async (_, { userName, email, password }) => {
      console.log(" userName, email, password", userName, email, password)
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("hashedPassword", hashedPassword)
      const newUser = new UserModel({ userName, email, password: hashedPassword });
      return await newUser.save();
    },
    loginUser: async (_, { email, password }, { res }) => {
      console.log("  email, password", email, password)
      // 1. 参数解析：
      // _ : parent 对象（这里用不到，所以用下划线占位）
      // { email, password } : 从前端 GraphQL Mutation 传过来的变量 (args)
      // { res } : 从 Apollo Context 中解构出来的 Express 响应对象 (Response)。
      //           ⚠️ 注意：要拿到这个 res，必须在 server.js 的 context 配置里把它传进来！

      // 2. 数据库查询：根据邮箱查找用户
      const user = await UserModel.findOne({ email });
   
      // 3. 安全校验（账号与密码）
      // 条件一：如果找不到该用户 (!user)
      // 条件二：如果前端传来的明文密码，与数据库里的哈希密码比对失败
      // 💡 安全细节：把账号不存在和密码错误合并处理，统一返回 false，
      // 可以防止黑客通过报错信息猜测系统中到底有没有这个邮箱（防止“用户枚举攻击”）。
      if (!user || !(await bcrypt.compare(password, user.password))) return false;

      // 4. 签发“防伪身份证” (JWT)
      // 载荷 (Payload)：只存用户的 id， id信息被存在token的密钥中
      // 密钥 (Secret)：服务器独有的 JWT_SECRET
      // 配置：设置该 Token 的有效期为 1 小时 (expiresIn: '1h')
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

      // 5. 核心区别：后端直接种 Cookie！
      // 调用 Express 的 res.cookie() 方法，告诉浏览器：“请把这个 token 存到你的 Cookie 里”。
      // 🛡️ { httpOnly: true } 是极佳的安全实践！
      // 它意味着这个 Cookie 只能在浏览器发网络请求时自动带上，前端的 JavaScript 代码（如 document.cookie）绝对读取不到它！
      // 这能有效防范 XSS（跨站脚本攻击）窃取 Token。
      res.cookie('token', token, { httpOnly: true });
      return true;
    },
    logOut: (_, __, { res }) => {
      res.clearCookie('token');
      return 'Logged out successfully!';
    },
  },
};

export default userResolvers;
