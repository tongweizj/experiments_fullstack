# README

## REACT 基础知识

### 利用components创建页面基本结构

```js
import React from "react";
import Header from "./components/Header";
import Meme from "./components/Meme";
function App() {
  return (
    <>
      <Header />
      <Meme />
    </>
  );
}
export default App;
```

- Header 页面可以复用的结构
- Meme   业务展示组件

### Hook

#### useState

注意点

- 状态监控参数变化的逻辑
- 对象必须是改变内存地址，才会重新渲染页面
- 状态传递给子组件时，如果需要更改数据，相关方法要写在父组件理，并把方法传递给子组件

#### useEffect

## 开发技巧

### 本地测试数据

- 数据存储
清查看`/src/memeData.js`

- 使用

```js
import memesData from "../memesData.js"
console.log(memesData) // memsData 是一个对象
```
