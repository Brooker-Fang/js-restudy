## this
判断this的四条规则，按照优先级依次为：
+ 如果通过new调用，则this绑定到新创建的对象
+ 由call、apply、bind强制绑定，this指向绑定的对象
+ 由上下文对象调用，this指向那个上下文对象
+ 默认绑定全局对象
+ 当使用严格模式时，this无法默认绑定this。（注意：这里的严格模式指的是 函数创建的时候是否处于严格模式，而不是函数的调用位置）

### 严格模式下的this
当使用严格模式时，this无法默认绑定this。
```js
"use strict"
function testThis() {
  console.log(this)
}
testThis() // undefined
// 或者
function testThis2() {
  "use strict"
  console.log(this)
}
testThis2() // undefined
```
严格模式指的是 函数创建的时候是否处于严格模式，而不是函数的调用位置
```js

```
## 箭头函数
+ 箭头函数的主要设计目的就是 以特定的方式改变this的行为特性
+ 在箭头函数内部，this绑定不是动态的，而是词法的。可以理解为，箭头函数的this和词法环境医院，由代码的书写位置决定
## 这几种情况的this指向window
+ 立即执行函数
+ setTimeout 和 setInternal 传入的函数（不包括箭头函数）

## call、apply、bind原理实现
## 总结
+ this的指向是在函数调用时决定的，而词法环境则相反，是在书写完代码决定的
+ 箭头函数没有this绑定，所以会需要找外部词法环境中的this，所以箭头函数的this词法环境一样，由代码的书写位置决定