## 什么是fiber
## 为什么需要fiber
+ 大型项目里，组件树会变得很大，递归遍历的成本很高，并且造成主线程被持续占用，结果就是主线程的布局、动画等周期性任务就无法立即得到处理，造成卡顿，影响用户体验
## 有了fiber，能完成那些事情
+ 工作单元 任务分解：Fiber最重要的功能就是作为工作单元，保存元素节点或者组件节点对应信息，这些节点通过指针的形式形成Fiber树
+ 增量渲染：通过jsx对象和current Fiber的对比，生成最小的差异补丁，应用到真实节点上
+ 根据优先级暂停，继续，排序优先级：Fiber节点上保存了优先级，通过不同节点优先级的对比，达到任务的暂停、继续、排列优先级等能力，也为上层实现批量更新、Suspense提供了基础
+ 保存状态：因为Fiber能保存状态和更新的信息，所以就能实现函数组件的状态更新，即hooks  
## fiberRoot 和 rootFiber区别
+ fiberRoot指整个应用的根节点对应的fiber，整个应用只有一个
+ rootFiber即render的最上层节点，有多个

## 为什么react17之后不再需要每个文件都引人react
+ 其内置了一个jsx-runtime的运行时

## React15 架构缺点
+ 15的协调更新过程是同步不可中断的，当组件层级很深时，执行递归更新的时间超过16ms，用户交互就会产生卡顿，所以react16主要就是实现可中断的更新

## React16-17版本更新
https://zhuanlan.zhihu.com/p/52016989
主要更新：
16.0：Fiber架构
16.3：生命周期更新
16.7：Hooks
16.8：新增Concurrent Rendering并发渲染模式（实验版本）
17.0：主要是降低后续版本的升级成本，提供渐进式升级，提供不同版本的react渲染
## React17的架构主要实现
+ 一个是Fiber数据结构，对应真实dom并且又能作为最小的工作单元
+ Scheduler，react16中的异步调度机制，实现在浏览器空闲时间去执行更新，让高优先级的任务优先响应，类似requestIdleCallback，但因为requestIdleCallback存在着浏览器的兼容性和不稳定性，react17中采用MessageChannel实现，如果当前环境不支持MessageChannel，则使用setTimeout
+ lane：管理任务的优先级
## jsx
react通过babel插件解析，将jsx即组件内的render函数转为React.createElement, jsx本质上是React.createElement的语法糖
createElement将dom 转为vNode，而Fiber也是通过vNode构建的
## Fiber
用于保存dom节点、属性、
保存状态和更新信息
保存父节点、子节点，形成Fiber树
## Fiber双缓存技术
React会形成两颗Fiber树，一个是正在内存中构建的workInProgress Fiber树，一个是正在屏幕显示的真实dom对应的current Fiber树，两棵树通过alternate属性连接。无论更新还是挂载，都会在内存中先构建workInProgress Fiber树，然后在将构建好的树切换为current Fiber，在渲染为真实dom。区别在于 挂载时，current Fiber树是空的，而更新时，可以通过复用current Fiber节点去生成workInProgress Fiber树。
## key值的作用
和type值一起作为元素的唯一标识，便于复用
## diff算法
单节点：
通过key和type对比是否可以复用。
key不同，type不同，标记删除该节点和兄弟节点，然后新建节点
key不同直径标记删除节点，然后新建节点
多节点对比：
第一次遍历新的fiber数组节点，如果和旧的fiber节点相同，则复用，不同则跳出遍历。
判断新的fiber节点是否已经遍历完成，并且还剩旧的节点，则直接删除节点
判断新的fiber节点是否还有剩余，并且旧节点已经遍历完，则直接添加节点
剩下的就是除了节点的移动：先将旧的fiber节点加入一个map，然后新的fiber去map里找，如果找到了就复用并移动节点

## refs是什么
提供访问DOM节点和React元素的方式。
函数组件上不能使用ref，要用forwardRef创建
使用方式：
1：hooks里使用useRef
2：使用createRef创建
3：使用callback方式创建（不建议使用内联形式创建，会在更新阶段执行两次）
forwardRef还有一个作用是转发高阶组件里的ref

## 生命周期
类组件的生命周期：
去掉了3个will生命周期，跟Fiber冲突
挂载时：constructor => getDerivedStateFromProps => render => componentDidMount
更新时：getDerivedStateFromProps => shouldComponentUpdate => render => getSnapshotBeforeUpdate => componentDidUpdate
卸载时：componentWillUnmount
函数组件的生命周期：
会在函数执行后 执行一次副作用函数，useEffect
## 事件系统
react有自己的一套事件合成机制，可以解决不同平台的兼容性。
1、先去事件映射表看看有没有在里面，如果有说明是合成事件
2、把事件绑定到。
原生事件的使用：通过addEventListener给dom添加原生事件。
React合成事件和DOM原生事件混用。会先执行原生事件，在去执行合成事件。
原生事件中使用e.stopPropagation()会阻止合成事件的执行。
但在合成事件中阻止冒泡则不会阻止原生事件的执行。
## setState
setState可以是同步也可以是异步。
在setTimeout或者原生事件里，是同步的方式。
在生命周期，合成事件里则是异步批处理的方式。
通过executionContext去判断，原生事件和setTimeout中的executionContext值是0，会走同步更新的方式
其他情况executionContext的值不为0，走异步批处理的方式
## 跨层级组件通信
1、ContextApi：
  创建：React.createContext创建Context
  使用：1、使用Class.contextType属性接收，但只能订阅单一的context
  2、使用React.Provider/Consumer组件 传递context
注意事项：如果Provider的value值是对象，要放到this.state的数据里，避免每次value对比值都不同，引起不必要的更新
## 函数组件和类组件对比
hooks比较好实现状态和逻辑的复用，逻辑可以实现更小颗粒度的复用，便于维护
函数组件避免了this
## hooks原理
主要是将状态保存在
## 性能优化
shouldComponentUpdate
useCallback\useMemo
PureComponent
## react有三种模式
legacy模式：ReactDOM.render，当前React使用的方式，不支持新功能。即还是同步递归更新模式
blocking模式：ReactDOM.createBlockingRoot，作为迁移concurrent模式的降级模式
concurrent模式：ReactDOM.createRoot 开启所有新功能模式。如setState不管是在原生事件或合成事件都会变成异步批处理的方式、时间调度实现异步可中断的任务