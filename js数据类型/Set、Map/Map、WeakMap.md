## Set集合
成员是无序 且 没有重复值。
Set是类数组，可以用Array.from 转换为数组
### 操作方法
+ add(val)
+ delete(val)
+ has(val)
+ clear() 清空集合
### 遍历方法
键值其实就是数组的索引，从0开始
+ keys()
+ values(), 默认迭代器生成函数
```js
Set.prototype[Symbol.iterator] === Set.prototype.values() // true
...new Set([1,2,3]) // 即默认遍历values
```
+ entries()
+ forEach()
```js
const set = new Set()
set.add(1).add({name: 'fhh'}).add(3)
set.forEach((value, key)=> {
  console.log(key + ':'+ value)
})
```
### 实现交集、并集、差集
```js
const s1 = new Set([1,2])
const s2 = new Set([2,3])

let intersect = [...([...s2].filter(value => s1.has(value)))]
console.log(intersect)
let union = [...new Set([...s1, ...s2])]
console.log(union)
let diff =[...s2].filter(val => !s1.has(val))
console.log(diff)
```
### 注意
+ set不会发生类型转换，即1 和 '1'是不同的值
+ 可以链式调用
```js
const set = new Set()
set.add(1).add({name: 'fhh'}).add(3)
```

## WeakSet
WeakSet和 Set的区别在于，WeakSet只能存储对象引用，不能存放值，而Set对象和 原始值都可以。
WeakSet 对象是无法被遍历的，并且不支持size()和keys()，因为WeakSet存的是弱引用，如果里面的对象值没有引用，则会被垃圾回收掉，所以size不准确，并且遍历前后的值也不一定准确。
```js
let obj = {name: 'fhh'}
let wSet = new WeakSet()
wSet.add(obj)
console.log(wSet.has(obj))
obj = null // { name: 'fhh'}对象没有被引用，所以wSet里的会被回收掉
console.log(wSet.has(obj)) // false
```
WeakSet主要场景是用来表示 某对象是否存在
