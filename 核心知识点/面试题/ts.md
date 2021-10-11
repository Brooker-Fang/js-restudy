## 什么是ts
+ ts是js 的超集
+ 增加类型检测、一些新语法比如接口啊
+ 可以一定程度上减少bug
## ts有哪些数据类型
+ 6个基本类型:number\string\null\undefined\boolean\Object
+ any: 适用场景：不确定类型的，如用户输入、第三方插件
+ void
+ enum 枚举类型
  ```js
  enum Color { Red, Green, Blue }
  let c:Color = Color.Blue
  ```
  + 应用场景：主要是提高代码的可读性，便于维护
+ never 类型
+ tuple 元组类型，允许表示一个已知元素数量和类型的数组
```js
let tupleArr: [number, string, boolean]
tupleArr = [12, '12', true]
```
## ts中const和readonly区别
+ const防止变量被修改，readonly防止属性被修改

## 枚举和常量枚举的区别

## 接口和类型别名区别，即interface和type
+ 接口只能用来描述引用类型，类型别名还可以用于其他类型
## any类型作用是什么
+ 为编程节点还不清楚类型的变量指定一个类型，一般用于动态的内容，比如用户输入、第三方代码库