
## 常用数组方法

### 会改变原始数值的方法
### sort(fn || null)
如果没有传参，默认按照UTF-16排序
如果传入函数比较，
  + 返回值 > 0, a,b交换位置
  + 返回值 = 0，位置不变
  + 返回值 < 0, 位置不变
sort会改变原数组，并且返回原数组
```js
const arr = [1,3,2]
arr.sort()
console.log(arr) // [1,2,3]
arr.sort() === arr // true
```
## 判断是否为数组类型
优先使用：isArray => Object.prototype.toString.call => instanceof
```js
const arr = [1,2,3,4]
Array.isArray(arr)
Object.prototype.toString.call(arr) === '[object Array]'
arr instanceof Array
```