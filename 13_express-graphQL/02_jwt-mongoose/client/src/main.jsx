import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
//
import { ApolloClient, InMemoryCache, createHttpLink  } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
//
const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  // JWT： 🌟 核心配置：告诉浏览器跨域请求时一定要带上 Cookie！
  credentials: 'include'
});
// 初始化 Client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>

    <App/>

  </ApolloProvider>
)
