https://juejin.cn/post/6930897845369356295
https://mp.weixin.qq.com/s/8RJGp9M9yNx-LMcN5q8gUQ

## v-if和v-for哪个优先级更高？怎么优化
+ 从源码上看，在处理ast时，是先处理v-for的，所以v-for优先级更高
+ v-for优先级高，一起使用会导致每一项渲染时都会做判断
+ 优化：先对列表做过滤，在用v-for显示
## vue组件的data为什么必须是个函数？并且Vue的根实例则没有此限制？
+ 如果data是函数则会执行函数并将函数执行结果作为组件的data，这样每次初始化产生的都是新的data镀锡，而如果是对象则直接作为组件的data，这样每个组件实例的data都指向同一个引用，容易造成数据污染
+ Vue根实例只有一个，所以不需要考虑多例的情况

## vue中key的作用和工作原理
+ key的主要作用是为了高效的更新虚拟dom，因为key是作为patch过程中判断节点是否相同的条件之一，从而避免频繁更新不同的元素，让整个patch过程更高效，减少dom操作，提高性能
+ 如果不设置key或者key设置的不合理，有可能会引发一些隐蔽的bug

## vue的diff算法
+ vue的diff其实就是组件执行更新时做的patch过程，对比更新新旧虚拟dom节点
+ diff过程整体遵循深度优先、同层比较的策略。如果是单节点对比，会根据它们是否拥有子节点或者是否文本节点等做不同的操作。如果是多节点，则会假设首尾相同做4次对比尝试，如果没有相同节点在用遍历的方式查找相同节点，在对比完节点后再按情况处理剩下的节点。如新的先遍历完，则做删除操作，否则做添加节点操作

## vue组件化的理解
+ 组件化能大幅度提高应用开发效率
+ 组件可以分为页面组件、业务组件、通用组件
+ 合理划分组件，有助于提高性能
+ 组件应遵循单向数据流的原则

## 对MVC、MVP、MVVM理解
目标都是为了解决Model和View的耦合问题
MVC：通信是单向的，View传递命令到Controller，Controller完成业务逻辑后，让Model改变状态，Model将改变后的数据发送到View
MVP: 各部分直接的通信都是双向的，View不与Model发生联系，由Presenter传递，解决了MV的耦合问题，但是Presenter过于臃肿导致维护问题
MVVM: 采用双向绑定，view变动会反映给ViewModel，ViewModel改变也会反映在View层，即解决了耦合问题，还保持了可维护性、和不错的性能表现

## 对MVVM的理解
+ Model是数据模型，View是视图层，ViewModel是连接View和Model的桥梁，数据绑定到ViewModel，ViewModel改变时，自动更新视图，视图变化则通知ViewModel更新数据
## vue性能优化
+ 路由懒加载
+ keep-alive缓存页面
+ 用v-show复用dom
+ 第三方插件按需引人
+ 与视图渲染无关的数据不用写在data里
+ 可以用computed缓存数据
+ 合理设置key值
## 简述vue模板编译过程
+ 想将template字符串转为ast抽象语法树
+ 然后对ast抽象语法树做一些优化操作，主要是标记静态节点和静态根节点，做patch更新时可以跳过这些节点
+ 再将优化好的ast通过递归的方式，拼接为render函数的字符串，最后执行new Function转为render函数

## Vue3的了解
+ Composition API，可以更好的做逻辑复用
+ 基于Proxy的响应式系统，提升组件实例初始化速度，还能节省内存开销
+ 使用TS和模块化，更好维护
+ 编译的优化，更准确的检测静态节点，降低渲染成本

## Vue-Router中的导航钩子有哪些
+ 全局钩子：beforeEach、afterEach
+ 组件内钩子：beforeRouterEnter、beforeRouteUpdate、beforeRouteLeave
+ 路由配置内的钩子：beforeEnter

## Vue响应式的理解
+ 初始化时，会对组件内的data里的每个属性做响应式操作
+ 用Object.defineProperty对属性做劫持，get时收集依赖到dep，set时通知所有依赖做更新操作
+ 每个组件对应一个渲染watcher
+ 属性改变时，会通知属性的dep做更新，此时dep通知渲染watcher做更新视图操作

## 路由有哪些模式？有什么不同？
+ hash模式：监听hashchange事件，获取路由的hash值，实现路由切换
+ history：通过pushState和replace切换url，触发popstate事件，实现路由切换，需要后端配合
## 前端路由怎么实现
+ 主要目标是根据不同的路由，显示不同的页面内容，可以基于hash或者historyApi
+ 可以通过hashchange事件或者popstate事件，监听路由的变化，切换组件，从而展示不同的内容

## vue-router实现原理
+ 有两种模式，一种是hash模式，一种是history模式，has模式就是监听hashchange事件，如果是history，则是监听popstate事件。监听路由的变化
+ 将路由的值做响应式处理，当路由变化时，去路由表找对应的组件，然后渲染组件
## vuex的使用和理解
+ vuex主要是用来管理组件的共享状态
+ vuex本身是一个状态树，组件中可以使用store实例的state访问这些状态，只能通过mutation修改状态，组件中可以使用commit方法提交mutation
+ 如果有异步操作，使用dispatch派发action做异步操作，在通过mutation修改状态。
+ 并且vuex还支持模块化，每个模块拥有自己的state、mutation、action、getter
## vue为什么要求组件模板只能有一个根元素
+ new Vue的时候需要指定一个入口
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
子组件使用$emit
ref
vuex
eventBus
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
## Vuex和Redux区别
+ vuex只能配合vue使用，redux比较通用
+ vuex异步actions处理然后commit提交，redux则是通过中间件处理

## v-if、v-show、v-html 的原理是什么，它是如何封装的
+ v-if 不会生成vnode，render的时候不会渲染
+ v-show 会生成vnode，render渲染的时候会修改节点的display属性
+ v-html 会先移除节点下的所有节点，通过innerHTML添加内容
## nextTick的理解和nextTick原理
+ 因为vue采用的是异步更新的策略，数据修改是并不会马上渲染视图，而nextTick可以让我们在dom更新后获得最新的状态
+ nextTick会把回调函数加入到异步任务队列callbacks, 如果视图发生更新，vue会把需要更新的watcher推入队列，并做去重和排序处理，然后把执行watcher的方法flushQueue也是用nextTick的方式加入到异步任务callbacks里，所以在flushQueue执行之后的异步任务，都可以获取到最新的状态值
+ vue的异步任务降级处理：优先使用Promise、mutationObserver、setInterval、setTimeout

## computed和watcher有什么不同
## 对象新属性无法更新视图，删除属性无法更新视图，为什么？怎么办？
+ vue的响应式是通过Object.defineProperty实现的，这个api不支持监听属性的新增和删除
+ 使用$set和$delete,$set和$delete原理都是直接获取所属对象的dep，手动通知dep的依赖执行更新
## 如果子组件改变props里的数据会发生什么
+ 如果是原始值会报错，引用值会跟着变
## computed如何实现传参
+ 返回一个函数

## provide和inject是响应式的吗？
+ 不是响应式的。但如果是引用对象，改变属性值，是可以响应的