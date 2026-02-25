# String Snippet

## 1. 大小写

### 判断是否大小写
方法 1
```js
/[A-Z]/.test('A') // true
/[A-Z]/.test('a') // false
```

方法 2
```js
'A' === 'A'.toUpperCase() // true
'a' === 'a'.toUpperCase() // false

function IsUpper(str){
  return str === str.toUpperCase() 
}
console.log(IsUpper('a')) // fasle
console.log(IsUpper('A')) // true
```



## 2. 取最后一位

首先请出我们今天的主角平平无奇字符串君：

```js
const str = "I'm a zifuchuan";
```

### 1. substring 法

这个是最官方的解法，如果不是出于炫技需要使用这种方式就好啦~ 老人家必备喔（你好烦

```js
// substring 返回开始索引到结束索引之间的子字符串，第二个参数可选
str.substring(str.length - 1);
// 远房亲戚 substr 君，区别是第二个参数用来限定截取的子字符串长度，默认为 1
str.substr(str.length - 1);
```

### 2. charAt 法

这个解法的经典程度不亚于上面那个，也是比较推荐（老牌）的写法。

```js
// charAt 返回字符串特定索引上的字符，默认为 0
str.charAt(str.length - 1);
// 约等于
str.[str.length - 1];
```

### 3. 斩斩斩斩成十八碌

如标题所示，这种方式首先要字符串君斩成十八块，然后数组索引获取你要的那一块就行啦。

```js
str.split('')[str.length - 1];
```

### 4. 正则法

正则大法好！！

```js
str.match(/.$/).pop();
```

### 5. 变身数组君法

Array.prototype.from 可以把类数组对象转换成数组，再加上原生带有迭代器，可以说是最适合转成数组的基本类型了

转成数组之后就想怎么操作就怎么操作啦~

```js
Array.from(str).pop();
```

### 6. 解构法

前面提到了字符串带有原生的迭代器，这也意味着我们可以直接用解构语法直接把字符串转换成数组，剩下你懂的...

```js
// 是不是很骚 
[...str].pop();
```

以后如果遇到老人家在敲代码就把这段代码 show 给他，然后就可以准备躲开他的梭子轻松躲雨啦~

（最后的两种方法其实都可以算是一种用法，只不过为了玩梗生生凑成了六种）

以上就是今天给大家介绍的提取字符串最后一位的所有骚玩法。

虽然可能还有其他的骚写法，不过大体原理都万变不离其宗，无非就是借助截取字符串的一些接口或者转换成数组类型使用数组的接口来处理，非常简单（且骚）。

## 3. 两个字符串找差异

```js
  standStr = "abcdef";
  str = "abcef"
  // 3. 将标准答案和要比较的字符串对应，查看缺什么
  for(let i = 1; i<standStr.length -1; i++){
    console.log(standStr[i]);
    if(str.search(standStr[i]) == -1){
      console.log(str.search(standStr[i]));
       missingLetter = standStr[i];
       return standStr[i];
    }
  }
```


## 4. 去除空格

去两头
```
dd = '  dd  '
dd.trim()
> "dd"
```
 
 去左边
```
dd.replace(/^\s+/g,"")
"dd  "
```

去右边
```
dd.replace(/\s+$/g,"")
"  dd"
```
