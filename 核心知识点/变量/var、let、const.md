## 概要
原本只是想复习一下变量提升的知识，没想到引发了一系列知识点出来，什么执行上下文、环境记录、词法环境、变量环境。。。真滴是活到老学到老。
## 先看下什么是变量提升
变量提升 指的是 js代码执行过程中，js引擎把变量声明部分和函数声明部分提升到作用域顶端，并设置默认值undefined
```js
showName()
console.log(name) // undefined
var name = 'fhh'
function showName() {
  console.log('showName')
}
```
相当于
```js
function showName() {
  console.log(name)
}
var name
showName() // showName
console.log(name) // undefined
name = 'fhh'
```
并且函数提升优先级高于变量提升。
```js
function test() {
  console.log(name) // 打印function
  var name = 'test' // 
  function name() {}
  return name 
}
console.log(test()) // test
```
如果变量同时发生变量提升和函数提升，函数提升优先级高于变量提升，并且不会将变量覆盖为undefined。
这段代码可以理解为
```js
function test() {
  function name() {}
  console.log(name) // 打印function
  name = 'test'
  return name 
}
console.log(test()) // test
```
## 变量提升的问题
+ 变量容易在不被察觉的情况下覆盖掉
```js
var name = 'window'
function showName() {
  console.log(name)
  if(false) {
    console.log('这段代码并没执行')
    var name = 'false'
  }
}
showName() // undefined
```
+ 本应该销毁的变量没有被销毁
```js
for(var i = 0; i<5; i++){
  ...
}
console.log(i)
```
## 为什么会出现变量提升，先来看看js代码执行流程
+ 代码执行分为编译阶段和执行阶段（当执行全局代码 遇到函数时，也会先对函数进行编译，然后再执行）
+ 编译阶段：
  + js代码经过编译后，会生成两部分内容：执行上下文和可执行代码
  + 创建执行上下文由三部分组成：即This Binding、VariableEnvironment（变量环境组件）、LexicalEnvironment（词法环境组件）
    + This Binding即this的指向
    + 变量环境组件VariableEnvironment 保存着 var声明的变量和函数function、并且变量初始化值为undefined
    + 词法环境组件Lexical Environment 保存着let、const声明的变量和函数
  + js引擎会把声明以外的代码编译为字节码，作为可执行代码
+ 执行阶段：
  + 执行代码时，遇到变量或者函数，会到执行上下文所保存的变量环境组件VariableEnvironment 或者LexicalEnvironment词法环境组件查找
## 变量提升原理
可以看到所谓的变量提升，其实只是变量创建的过程 和 真实赋值的过程不同步带来的错觉, 因为在代码编译阶段已经把变量初始化好了，并且即使是let和const声明的变量也会进行变量提升，不过会多形成一个暂时性死区和块作用域
## 暂时性死区
let、const声明的变量 也在编译时创建，即亦会出现变量提升的情况，但是在代码未执行到 变量初始化之前 对变量进行访问或者赋值就会报错，所以变量初始化之前的代码叫暂时性死区。例如下面的代码会直接抛出错误
```js
{
  var a = 1
  let a = 1 
}
{
  function a(){}
  let a = 1 
}
```
## 总结
+ 变量提升的原因是js代码在编译过程中已经对var声明的变量和function函数进行初始化。所以变量提升的本质，其实只是变量创建的过程 和 真实赋值的过程不同步带来的错觉
+ let、const声明的变量也会进行变量提升，但是会形成暂时性死区，所以在执行到赋值代码之前，访问变量的话会报错
+ 关于执行上下文和环境变量可以看这里：https://blog.csdn.net/comedyking/article/details/119722561
