## this
判断this的五条规则，按照优先级依次为：
+ 如果通过new调用，则this绑定到新创建的对象
+ 由call、apply、bind强制绑定，this指向绑定的对象
+ 由上下文对象调用，this指向那个上下文对象
+ 默认绑定全局对象
+ 当使用严格模式时，普通函数的this无法默认绑定this。（注意：这里的严格模式指的是 函数创建的时候是否处于严格模式，而不是函数的调用位置）

### 由上下文对象调用，this指向那个上下文对象
这个是比较让人纠结的规则。如
```js
let obj = {
  testThis: function() {
    console.log(this)
  },
  testThis2: function() {
    return function() {
      console.log(this)
    }
  }
}
obj.testThis() // obj
obj.testThis2()() // window testThis2执行后返回新的函数，新函数执行时并没有上下文，所以指向默认绑定的全局对象
let test = obj.testThis 
test() // window
```
其实可以这么理解，当创建函数的间接引用，如函数参数里的回调函数等，this指向全局对象。这里不包括箭头函数和强制绑定
```js
let obj = {
  testThis: function() {
    console.log(this)
  },
  testThis2: function(cb) {
    cb()
  }
}
obj.testThis() // obj
// 下面都是创建了函数的间接引用
let testThis = obj.testThis
testThis() // window
obj.testThis2(obj.testThis) // window
```
其实setTimeout 和 setInternal 传入的函数和上面一样的道理，亦是将函数作为回调函数去执行
```js
function testTimeout1() {
  setTimeout(function(){
    console.log(this) // 一直指向window
  })
}
function testTimeout2() {
  setTimeout(() => {
    console.log(this) // this继承testTimeout2的this
  })
}
let obj = {
  name: 'fhh'
}
testTimeout1.call(obj) // window

testTimeout2.call(obj) // obj
testTimeout2() // window
// 如果setTimeout传入的函数是经过 强制绑定的，this指向绑定的上下文对象
setTimeout(testTimeout2.bind(obj))
```
### 严格模式下的this
当使用严格模式时，普通函数的this无法默认绑定this。
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
function testThis() {
  console.log(this)
}
function testThis2() {
  "use strict"
  testThis()
}
testThis2() // window
```
使用严格模式时，this的指向并不一定为undefined
```js
"use strict"
console.log(this) // window
let testThis = () => {
  console.log(this) 
}
testThis() // window
setTimeout(function(){
  console.log(this) // window
})

```
## 内置函数的this
一些内置函数的this，主要还是看其内部的实现
### setTimeout
```js
// 猜测其内部实现并没有指定上下文，所以this指向window
setTimeout(function() => {
  console.log(this)
}, 2000)
```

### dom元素的click事件
```js
// 内部实现时 可能将上下文指定为div，所以this指向div元素
div.onclick = function() {
  console.info(this)
}
div.addEventListens('click', function() {
  console.info(this)
})
```
### 数组的forEach/map/filter 等方法

```js
// this指向window
[1,2,3,4].forEach(function() {
  console.info(this)
})

```
## 箭头函数
+ 箭头函数的主要设计目的就是 以特定的方式改变this的行为特性
+ 在箭头函数内部，this绑定不是动态的，而是词法的，继承最近的外部词法环境的this。可以理解为，箭头函数的this和词法环境（即词法作用域）一样，由代码的书写位置决定
+ 箭头函数的this不根据五条规则判断，而是根据当前的词法作用域决定
```js
let obj = {
  name: 'fhh',
  testThis: () => {
    // 函数是在全局作用域定义的  所以this指向全局对象
    console.log(this)
  }
}
obj.testThis() // window
obj.testThis.call({name: 'gg'}) // window 使用强制绑定也没用
function testTimeout2() {
  setTimeout(() => {
    console.log(this) // this指向了testTimeout2的this
  })
}
testTimeout2.call(obj) // obj 
testTimeout2() // window 
function testThis
```
## 模拟实现call、apply、bind
call方法模拟
```js
Function.prototype.myCall = function(context, ...args) {
  const ctx = context || window
  const fn = Symbol()
  args = args || []
  ctx[fn] = this
  ctx[fn](...args)
  delete ctx.fn
  
}
var name = 'window'
function showName(age) {
  console.log('name===' + this.name + ',age===' + age)
}
showName(18)
showName.myCall({name: 'fhh'})
showName.myCall({name: 'fhh'}, 18)
```
apply方法模拟
```js
Function.prototype.myApply = function(context, args) {
  const ctx = context || window
  const fn = Symbol()
  args = args || []
  ctx[fn] = this
  ctx[fn](...args)
  delete ctx.fn
}
var name = 'window'
function showName(age) {
  console.log('name===' + this.name + ',age===' + age)
}
showName(18)
showName.myApply({name: 'fhh'})
showName.myApply({name: 'fhh'}, [18])
```
bind方法模拟
```js
Function.prototype.myBind = function(context, ...baseArgs) {
  const ctx = context || window
  const fn = this
  baseArgs = baseArgs || []
  const fBound = function(...args) {
    // 如果作为构造函数，则this指向新的对象
    return fn.apply(this instanceof fBound ? this : ctx, [...baseArgs, ...args])
  }
  // 创建空函数, 避免修改到原来的原型对象
  const noop = function() {}
  noop.prototype = this.prototype
  fBound.prototype = new noop()
  return fBound
}
var name = 'window'
function showName(age) {
  this.age = age
  console.log('name===' + this.name + ',age===' + age)
  return this
}
let newShowName = showName.myBind({name: 'fhh'})
let obj = newShowName(18) // 打印 fhh, 18
let obj2 = new newShowName(20) // 打印 undefined, 20
```
MDN里面bind的实现,
```js
if(!Function.prototype.bind)(function() {
  var ArrayPrototypeSlice = Array.prototype.slice
  Function.prototype.bind = function(oThis) {
    if(typeof this !== 'function') {
      throw new TypeError('...')
    }
     var baseArgs= ArrayPrototypeSlice.call(arguments, 1),
        baseArgsLength = baseArgs.length,
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          baseArgs.length = baseArgsLength; // reset to default base arguments
          baseArgs.push.apply(baseArgs, arguments);
          return fToBind.apply(
                 fNOP.prototype.isPrototypeOf(this) ? this : oThis, baseArgs
          );
        };

    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();

    return fBound;
  }
}())

```
## 面试题

### 零
```js
var name = "window"
var person = {
  name: "person",
  sayName: function() {
    console.log(this.name)
  }
}

function sayName() {
  var say = person.sayName
  say()
  person.sayName();
  (person.sayName)();
  (say = person.sayName)(); // 相当于 say = person.sayName，say()
}
sayName()

```
答案：window、person、person、window
### 一
```js
var name = 'window'
 
var obj = {
  name: 'obj',
  test1: function () {
    console.log(this.name)
  },
  test2: () => { 
    console.log(this.name)
  },
  test3: function () {
    return function () {
      console.log(this.name)
    }
  },
  test4: function () {
    return () => { 
      console.log(this.name) 
    }
  },
  test5: function() {
    setTimeout(() => {
      console.log(this.name)
    })
  },
  test6: () => {
    setTimeout(() => {
      console.log(this.name)
    })
  },
}

obj.test1()  
obj.test1.call({name:'p2'}) 
 
obj.test2()  
obj.test2.call({name:'p2'}) 
 
obj.test3()()  
obj.test3().call({name:'p2'})   
 
obj.test4()()  
obj.test4.call({name:'p2'})() 
obj.test4().call({name:'p2'}) 

obj.test5()
obj.test6() 

```
正确答案解析：obj、p2、window、window、window、p2、obj、p2、obj、
obj、window
### 二
```js
obj.test1()  // obj obj是上下文对象
obj.test1.call({name:'p2'}) // p2 call绑定了新的上下文对象
 
obj.test2()  // window test2的外部词法环境是 全局环境，所以肯定指向全局对象
obj.test2.call({name:'p2'}) // window 箭头函数的this 只与外部词法环境有关，与上下文无关
 
obj.test3()()  // window 返回新的函数，没有指定上下文，默认绑定全局对象
obj.test3().call({name:'p2'})  // p2 新的函数绑定了上下文
 
obj.test4()()  // obj 返回的新的箭头函数，与test4函数的this一致
obj.test4.call({name:'p2'})() // p2 同上
obj.test4().call({name:'p2'}) // obj 与test4函数的this一致

obj.test5() // obj setTimeout 传入的箭头函数，与外部test5的this一致
obj.test6() // window
```
注意： bind多次绑定只有第一次有效，之后进行绑定不会有效果

### 三

```js
var name = "window"
function Person(name) {
  this.name = name
  this.test1 = function() {
    console.log(this.name)
  }
  this.test2 = () => console.log(this.name)

  this.test3 = function() {
    return function() {
      console.log(this.name)
    }
  }

  this.test4 = function() {
    return () => {
      console.log(this.name)
    }
  }
}

var p1 = new Person("p1")
var p2 = new Person("p2")

p1.test1() // p1
p1.test1.call(p2) // p2

p1.test2() // p1
p1.test2.call(p2) // p1

p1.test3()() // window
p1.test3.call(p2)() // window
p1.test3().call(p2) // p2

p1.test4()() // p1
p1.test4.call(p2)() // p2
p1.test4().call(p2) // p1
```

### 箭头函数和普通函数区别
+ 箭头函数没有this，会继承上层的this，箭头函数里的this在代码书写完就确定了，普通函数的this会在执行时确定
+ 箭头函数没有arguments对象
+ 箭头函数不能使用new实例化，因为new时需要将this指向实例对象，而箭头函数没有this
+ 箭头函数不能使用yield，所以不能作为generator函数
+ 箭头函数不能通过其他方式修改this