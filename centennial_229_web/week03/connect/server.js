// v-1 使用nodejs 原始的 http 库 
// const http = require('http');
// http.createServer((req, res) => {
//    res.writeHead(200, {
//    'Content-Type': 'text/plain'
//    });
//    res.end('Hello World');
// }).listen(3000);

// v-2 使用 connect 库
// step1 启动 web host 
const connect = require('connect');
const app = connect();
app.listen(3000);

function logger(req, res, next){
    console.log(req.method, req.url);

    next();
}
// helloworld 就是一个简单的middleware
function helloWorld(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World'); // end 表示结束
 };
function goodbyeWorld(req, res, next) {
res.setHeader('Content-Type', 'text/plain');
res.end('Goodbye World'); // end 表示结束
};
// 注册到connect
app.use(logger);
app.use('/goodbye', goodbyeWorld);
app.use('/', helloWorld); // 把helloworld 这个middleware 挂载在‘/’

 
console.log('Server running at http://localhost:3000/');
