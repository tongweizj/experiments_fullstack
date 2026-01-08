# 时间

## Unix 时间戳

Unix Time Stamp
即自 1970 年 1 月 1 日（UTC）起,到某个指定的时间, 经过的毫秒数。

所以
- 同一个瞬间，不论你在哪个时区，时间戳都是一样的
- 同一个日期，在不同时区，时间戳是不一样的。因为相同日期，在不同时区，不是一个瞬间。

## JS 时间戳

### Date 函数

给一个符合特定标准的 #时间String#, Date 函数能算出 unix 时间戳.
这个标准有很多

```nodejs
const date1 = new Date('December 17, 1995 03:24:00');
// Sun Dec 17 1995 03:24:00 GMT...

const date2 = new Date('1995-12-17T03:24:00');
// Sun Dec 17 1995 03:24:00 GMT...

console.log(date1 === date2);
// expected output: false;

console.log(date1 - date2);
// expected output: 0
```

### Date 常用方法

```js
## 当前时间戳
Date.now()

这个时间戳是基于 UTC 时间的
1. 先从系统本地,取一个时间
2. 转换成 UTC 时间
3. 根据 UTC 时间计算到 1970 年 1 月 1 日（UTC）起的时戳

## 前几天
Date.now() - 86400000 * n

## 今天的凌晨
new Date(new Date().setHours(0,0,0,0)) // 把当前时间的h,m,s,ms 置为 0,取时间戳,这个时间戳转到 utc 时间后,不是 0 点 0 分

## 3天以前的凌晨
new Date(new Date(new Date().setDate(new Date().getDate()-3)).setHours(0,0,0,0))
```



### 提取日期数据

- 获取年  ：`var y = date.getUTCFullYear();`
- 获取月  ：`var m = date.getUTCMonth() ;`
- 获取日  ：`var d = date.getUTCDate();`
- 获取小时：`var h = date.getUTCHours();`
- 获取分钟：`var M = date.getUTCMinutes();`
- 获取秒钟：`var s = date.getUTCSeconds();`



## UTC时间转本地时间

```
var toLocal = function(date) {
  // 确保date 最终为Date object
  date = new Date(date);
  var local = date.toLocaleString('en-US', {
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  return local;
};
```



## 本地时间转UTC时间

````
var toUTC = function(date) {
  // 确保date 最终为Date object
  date = new Date(date);
  // 加入"+08"来标示对应的时区
  var utc = date.toISOString().replace(/Z/, "+00");
  return utc;
};
````



```
SELECT * FROM public.device_status_view where status_time >1653938400000 and status_time <1653957600000
```

## 参考

- [mozilla JS 文档库](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 

