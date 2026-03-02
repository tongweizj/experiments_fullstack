import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import mongoose from './config/mongoose.js';
import typeDefs from './schemas/typeDefs.js';
import userResolvers from './resolvers/user.resolvers.js';

// 1. Set the 'NODE_ENV' variable programmatically
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log(`Running in ${process.env.NODE_ENV} mode`);

// 2. Initialize Mongoose
mongoose();

// 3. Initialize Apollo Server
const resolvers = {
  Query: {
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the Apollo Server
await server.start();

// 4. Initialize Express
const app = express();

// Middleware to parse cookies
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // React app's origin
  credentials: true,              // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

// Middleware to handle JSON bodies
app.use(bodyParser.json());

// Middleware to handle URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// JWT authentication middleware
app.use((req, res, next) => {
  // req (Request)：
  // 是浏览器发给服务器的东西（比如：“我要登录，这是我的账号密码”）。

  // res (Response)：
  // 是服务器发回给浏览器的东西（比如：“登录成功，这是你的 Token”）。
  const token = req.cookies.token;
  if (token) {
    try {
      const user = jwt.verify(token, 'some_secret_key');
      // JWT 的核心发力点！ 
      // 如果找到了 Token，使用服务器专属的密钥（some_secret_key）对其进行解密和验签。
      // 如果 Token 是合法的、没被篡改过、且没过期的，
      // 这行代码会把 Token 还原成一个包含用户信息的 JSON 对象
      // 比如 { id: '123', studentNumber: '...' }。
      req.user = user;
      // 将解析出来的用户信息，像贴标签一样，挂载到当前请求对象 req 上。
      // 这样一来，下游的所有接口（比如修改密码、添加课程的 Controller）
      // 都可以直接通过 req.user 知道当前是谁在操作。

    } catch (err) {
      console.error('JWT verification failed:', err.message);
      req.user = null;
    }
  }
  next();
});

// Apply Apollo Server middleware to Express
app.use(
  '/graphql',
  expressMiddleware(server, {
    context: async ({ req, res }) => ({ req, res, user: req.user }),
  })
);

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});
