`config.json`
```
{
  "name":"小三",
  "age":"18",
  "pond_list":[
    {
       "name": "New hospital", 
       "uuid": "0b9bc69101ab32e5f7f4d185fc8fdf9d"
    },
    {
      "name": "Romina", 
      "uuid": "ce9a6ea1a344b47e91bcdcff2c044614"
    }
  ]
}
```

`main.js`
```
var fs = require('fs');

//读取配置文件，变量config的类型是Object类型
var config = require('./config');

//1. 使用配置文件
console.log(config);

//2. 修改配置文件
config["name"] = "小四";
console.log(config.pond_list[0].name);

//3）将修改后的配置写入文件前需要先转成json字符串格式
var jsonstr = JSON.stringify(config);

//将修改后的内容写入文件
fs.writeFile('./config.json', jsonstr, function(err) {
if (err) {
  console.error(err);
}else{
  console.log('----------修改成功-------------');
}
});
```