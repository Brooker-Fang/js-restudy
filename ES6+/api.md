let\const
Promise
扩展运算符
Set\Map
class
Proxy\Reflect
export\import
async/await
symbol
箭头函数

## 字符串方法
trimStart\trimEnd
## 数组方法
Array.from 类数组转为数组
Array.of 
arr.copyWithin:
find() 和 findIndex()
includes(value, fromIndex) 从fromIndex索引开始查找，如果fromIndex大于数组长度，则直接返回false
flat\flatMap

## 对象新方法
Object.assign: 浅拷贝
Object.is(val1, val2)：判断两个值是否相等，和 === 一样，差别在于
Object.fromEntries
```js
+0 === -0 // true
Object.is(+0,-0);  //false

NaN === NaN // false
Object.is(NaN, NaN) // true

// Object.fromEntries应用场景
const queryString = "name=fhh&&age=18"
const queryParams = new URLSearchParams(queryString)
const paramsObj = Object.fromEntries(queryParams)
console.info(paramsObj)
```
