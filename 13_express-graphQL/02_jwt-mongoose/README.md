# README

这个demo 基于以下技术栈
- @apollo/server
- bcrypt
- cookie-parser
- cors
- express
- jsonwebtoken
- mongoose

核心演示功能

- GRAPHQL 连接 MongoDB
- Auth 实现 JWT

## MongdoDB

启动MongoDb服务，相关文件如下

- `./config/mongoose.js` 
服务启动脚本
- `./config/config.js` 
全局配置脚本
- `./config/env`
环境配置
DB连接配置，主要在这里

- `./server.js`
启动入口
```
// Initialize Mongoose
mongoose();
```

## express server
- `./server.js`
所有配置脚本，全在这里
完成如下配置
- web服务
- CORS
- bodyParser
- JWT authentication
  - cookieParser

## apollo server

- `./server.js`
启动入口


## JWT
实现JWT，有两种方案：
- 存 `LocalStorage` 
- 存 `httpOnly Cookie` 这次使用

1） 生成token， 写入cookies
详细注释，请看脚本
`./resolvers/user.resolvers.js`

```
loginUser: async (_, { email, password }, { res }) => {
      const user = await UserModel.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) return false;
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true });
      return true;
    },
```

2） 删除 token
详细注释，请看脚本
`./resolvers/user.resolvers.js`

```
    logOut: (_, __, { res }) => {
      res.clearCookie('token');
      return 'Logged out successfully!';
    },
```


3） 从request 中读取cookies
详细注释，请看脚本
`./server.js`
```nodejs
// JWT authentication middleware
app.use((req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const user = jwt.verify(token, 'some_secret_key');
      req.user = user;
    } catch (err) {
      console.error('JWT verification failed:', err.message);
      req.user = null;
    }
  }
  next();
});
```


4）客户端的配合

a. 客户端的JWT 设置
`./client/src/main.jsx`

```
// 1. 创建 HttpLink，并开启凭证传输
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql', // 你的后端地址
  // 🌟 核心魔法：告诉浏览器跨域请求时一定要带上 Cookie！
  credentials: 'include', 
});

// 2. 初始化 Client
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
```

b. 客户端检测是否登录，直接问服务端

1. 问服务端，之前是否登录过
2. 问登录是否过期

```
// query for checking if user is logged in
const LOGGED_IN_USER = gql`
  query IsLoggedIn {
    isLoggedIn
  }
`;
```