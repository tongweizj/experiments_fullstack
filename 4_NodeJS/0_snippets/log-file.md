```js
// index.js
const fs = require('fs');
let logOpions = {
 flags: 'a', //
 encoding: 'utf8', // utf8编码
}
let stderr = fs.createWriteStream('./output.log', logOpions);

// 创建logger
let logger = new console.Console(stderr);

// 真实项目中调用下面即可记录错误日志
logger.log('这是一条日志1');
logger.log('这是一条日志2');
logger.log('这是一条日志3');
```

