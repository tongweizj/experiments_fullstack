# Array Snippet

常见问题，记录以下情况的解决方案

1. 需要将集中方法组合起来使用
2. 



## 1. Array 类型判断

错误方法

```js
//首先看代码
var ary = [1,23,4];
console.log(typeof ary); //输出结果是Object
```



精确方法

```js
var ary = [1,23,4];

// 方法 1 instanceof
console.log(ary instanceof Array)//true;

// 方法 2 构造器
console.log(ary.__proto__.constructor==Array);//true
console.log(ary.constructor==Array)//true 这两段代码是一样的
```



**通用的方法**

```js
var ary = [1,23,4];
function isArray(o){
    return Object.prototype.toString.call(o)=='[object Array]';
}
console.log(isArray(ary));
```




## 2. 数组合并

代码案例：

```JS
var a = [1,2,3];
var b = [4,5,6];

//meth 1
var c = a.concat(b);
//c=[1,2,3,4,5,6]

//meth 2
for(var i in b){
    a.push(b[i]);
}

//meth 3
a.push.apply(a,b);

```

#### 方法 1 concat

js的Array对象提供了一个叫concat()方法，连接两个或更多的数组，并返回结果。

这里有一个问题，concat方法连接a、b两个数组后，a、b两个数组的数据不变，同时会返回一个新的数组。
这样当我们需要进行多次的数组合并时，会造成很大的内存浪费，所以这个方法肯定不是最好的。

#### 方法 2 for循环

大概的思路是：遍历其中一个数组，把该数组中的所有元素依次添加到另外一个数组中。直接上代码：

这样的写法可以解决第一种方案中对内存的浪费，但是会有另一个问题：丑！这么说不是没有道理，如果能只用一行代码就搞定，岂不快哉~

#### 方法 3 apply

函数的apply方法有一个特性，那就是

```JS
func.apply(obj,argv)，
// obj  被添加的数组
// argv 是一个数组
```

调用a.push这个函数实例的apply方法，同时把，b当作参数传入，这样a.push这个方法就会遍历b数组的所有元素，达到合并的效果。

　　　　这里可能有点绕，我们可以把b看成[4,5,6]，变成这样：

a.push.apply(a,[4,5,6]);
            然后上面的操作就等同于：

a.push(4,5,6);
　　　　这样就很清楚了！

#### 总结

另外，还要注意两个小问题：

1. 以上3种合并方法并没有考虑过a、b两个数组谁的长度更小。
所以好的做法是预先判断a、b两个数组哪个更大，然后使用大数组合并小数组，这样就减少了数组元素操作的次数！
2. 有时候我们不希望原数组（a、b）改变，这时就只能使用concat了。