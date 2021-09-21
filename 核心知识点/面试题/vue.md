https://juejin.cn/post/6930897845369356295
https://mp.weixin.qq.com/s/8RJGp9M9yNx-LMcN5q8gUQ
## Vue的事件绑定原理
编译阶段会根据正则，匹配@ 或 v-on字符串，然后解析出事件类型和 事件名或者表达式，
然后在组件初始化时，去添加相应的事件，在组件销毁前，去移除事件
## v-model中的实现原理及如何自定义v-model 
v-model其实是 input 和  value的语法糖
编译阶段会解析v-model指令，存到model对象，主要存value、callback、expression三个属性，
然后在初始化组件时，根据转换为input 和 value
## 生命周期
beforeCreate
created：数据初始化完成，实例初始化，但还未挂载
beforeMount
mounted：实例已经挂载，可以获取到dom
activated：缓存组件激活
beforeUpdate：组件更新之前，可以进一步更改数据，不会发生重新渲染
updated
beforeDestroy
destroyed
## 组件通信
provide/inject
props
$attrs/$listener
parent/children
$on/$emit
ref
vuex
## 插槽与作用域插槽的区别
普通插槽作用域是 父组件
作用域插槽的作用域是 子组件。
作用域插槽 会被解析承函数，当子组件渲染时，会调用此函数进行渲染
## 为什么data是个函数并且返回一个对象呢
## 如果子组件改变props里的数据会发生什么
如果是基本类型，会报错
如果是引用类型，不报错，原数据也会跟着改

## beforeCreate 和 created区别
## vue 中用过哪些修饰器
事件修饰符
.stop
.prevent
.capture
.self
.once
.passive

按键修饰符
.up
.down
.left
.right
.enter
.esc
.space
.delete
.tab

其他常用
.lazy
.number
.trim
.sync
