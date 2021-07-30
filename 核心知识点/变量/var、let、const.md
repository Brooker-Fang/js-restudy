## 变量提升
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
var name
function showName() {
  console.log(name)
}
showName() // showName
console.log(name) // undefined
name = 'fhh'
```
## 变量提升的问题
+ 容易在不被察觉的情况下覆盖掉
+ 本应该销毁的变量没有被销毁
```js
for(var i = 0; i<5; i++){
  ...
}
console.log(i)
```
## js代码执行流程
+ 分为编译阶段和执行阶段（当执行全局代码 遇到函数时，也会先对函数进行编译，然后再执行）
+ 编译阶段：
  + js代码经过编译后，会生成两部分内容：执行上下文和可执行代码
  + 执行上下文即 js执行时的运行环境，执行上下文保存着一个变量环境对象VariableEnvironment和词法环境LexicalEnvironment
    + 变量环境对象VariableEnvironment 保存着 var 声明的函数和变量，编译阶段如果发现同名的 变量或函数，则会进行覆盖
     ```js
      VariableEnvironment: {
        ['变量名']: undefined
        ['函数名']: function() {...}
      }
     ```
  + js引擎会把声明以外的代码编译为字节码，作为可执行代码
+ 执行阶段：
  + 执行代码时，如果查找变量或者函数，会到执行上下文所保存的变量环境对象VariableEnvironment 查找 
  + 如果要对变量进行赋值，也会赋值到变量环境对象上，如
   ```js
    VariableEnvironment: {
      name: 'fhh'
    }
   ```
+ 当js执行全局代码时，会编译全局代码并创建 全局执行上下文，全局执行上下文只会创建一个
+ 当调用一个函数时，函数体内的代码会被编译，并创建函数执行上下文，一般情况，函数执行结束后后，刚刚所创建的执行上下文 会被推出 js调用栈并销毁
+ 当使用eval函数时，eval的代码也会被编译，并创建执行上下文
## 变量声明提升的原理
所谓的变量提升，其实就是js编译阶段 会先把变量 初始化 到变量环境对象
## 执行上下文
分为三类
+ 全局上下文: 
+ 函数上下文
+ eval执行上下文
执行上下文、作用域、作用域链、执行上下文栈即调用栈、词法作用域

