# JavaScript 数据类型
JavaScript的数据类型有 8 种，7 种基本数据类型(也叫原始数据类型)：Number，Boolean，String，Null，Undefined，BigInt，Symbol，还有一种引用类型Object。

引用类型还有 5 种子类型，Math，Date，RegExp，Function，Array，和三种基本包装类型，即通过Number，String，Boolean构造函数 new出来的实例，如 new Number(1), new Stirng('whh')

注意：三种基本包装类型的实例是对象，可以对其设置属性，对于基本数据类型，设置属性无效
```js
let a = 1
a.name = 'whh' 
console.log(a.name) // undefined
let b = new Number(1)
b.name = 'fhh'
console.log(b) 
{
    name: "fhh"
    [[PrimitiveValue]]: 1 // PrimitiveValue是数据b的原始值，这个属性对于数据转换需要用到
}
```
## 基本数据类型与引用数据类型的不同
### 1 基本数据类型值是存储在栈中的，而引用数据类型的值是存储在堆中的
栈的存取速度比堆快，基本数据类型的数据占用空间小，大小固定，所以存放于栈中

引用数据类型内存大小不固定，需要动态分配，如对象属性和数组都可以无限扩展的，所以存放于堆中

### 2 基本数据类型保存和复制的是值，引用数据类型保存和复制的是值的引用
```js
let val = 1
let val2 = val
let obj = {
    name: 'whh'
}
let obj2 = obj
obj2.name = 'aa'
console.log(obj.name, obj2.name) // 'aa' 'aa'
// 因为obj和obj2 指向同一个数据，所以数据发生改变，打印出来的值当然就是一样的
```
![alt 属性文本](https://img-blog.csdnimg.cn/20210127194521569.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NvbWVkeWtpbmc=,size_16,color_FFFFFF,t_70)

注意：引用数据类型 传入 作为函数调用的参数，传入的也是引用地址
```js
let setName = function (obj) {
    // 传入的是 外部data所保存的引用地址
    obj.name = 'b'
    // obj 指向新的引用数据,即保存了新的引用地址
    obj = {
        name: 'c'
    }
    return obj
}
let data = {name: 'a'}
let data2 = setName(data) // 函数调用后，data和data2 指向的是不同的引用地址，所以打印的值不同
console.log(data.name, data2.name) // 'a' 'c'
```
## 数据类型的检测
### 1 检测基本数据类型，使用typeof
```js
typeof 1 // "number"
typeof "1" // "string"
typeof true // "boolean"
typeof undefined // "undefined"
typeof Symbol() // "symbol"
typeof 1n // "bigint"
```
注意：

1、 typeof 返回值是字符串类型

2 、typeof null 的值是 “object”， typeof new Function() 的值是 “function”
```js
typeof null // "object"
typeof new Function() // "function"
```
3 typeof 引用类型的值是 "object"， Function类型除外
```js
typeof { name: 'fhh' } // "object"
typeof new Function() // "function"
```
### 2 检测引用数据类型
1、使用instanceof判断。
```js
let a = { name: 'fhh' }
a instanceof Object // true
let b = [1,2,3]
b instanceof Array // true
let c = function () {}
c instanceof Function // true
```
instanceof 是用来检测左侧数据的 __proto__ 原型链上，是否存在右侧的 prototype 原型

原理实现：
```js
function myInstanceof(left, right) {
  if (typeof left !== 'object' || left === null) {
      return false
  }
  let __proto__ = left.__proto__
  // 往原型链上查找，直到原型为null
  while(__proto__) {
      if(__proto__ === right.prototype) {
          return true
      } else {
        __proto__ = __proto__.__proto__   
      }
  }
  return false
}
class Person {}
let p = new Person()
console.log(myInstanceof(p, Person))  // true
console.log(myInstanceof(1, Number))
console.log(myInstanceof(new Number(1), Number)) // true
console.log(myInstanceof({name: 'whh'}, Object))
```
2、使用Object.prototype.toString.call判断
```js
Object.prototype.toString.call([])  // "[object Array]"
Object.prototype.toString.call({name: 'f'}) // "[object Object]"
Object.prototype.toString.call(new Date()) // "[object Date]"
Object.prototype.toString.call(new Function()) // "[object Function]"
```
3、使用constructor构造函数判断
```js
new Date().constructor === Date // true
[].constructor === Array // true
```
注意：
1、如果构造函数的原型上的constructor属性被重置掉，则这种判断就不准确了
```js
function Person (){}
function newPerson (){}
let p = new Person()
p.constructor === Person // true
Person.prototype.constructor = newPerson
p.constructor === Person // false
p.constructor === newPerson // true
```
2、constructor也可以用于判断原始数据类型
```js
let a = 1
a.constructor === Number // true
```
