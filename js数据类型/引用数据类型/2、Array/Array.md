
## 常用数组方法

### 会改变原数组
push：返回数组长度
unshift：添加元素到开头，返回数组长度
pop：删除数组最后一个，返回被删除元素
shift：删除数组第一个元素，返回被删除的元素
reserve：翻转数组，返回反转后的新数组
splice: 返回被删除的元素组成的新数组
#### sort(fn || null)
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

### 不改变原数组
join(val): 将数组用val连接为字符串，返回字符串
slice(start, end)：获取子数组，不包含end
toString：将数组的元素用逗号拼接成字符串，返回拼接后的字符串
indexOf
lastIndexOf：从后面查找，返回索引
concat:连接新数组
forEach
map
filter
every
some
reduce
## 判断是否为数组类型
优先使用：isArray => Object.prototype.toString.call => instanceof
```js
const arr = [1,2,3,4]
Array.isArray(arr)
Object.prototype.toString.call(arr) === '[object Array]'
arr instanceof Array
arr.constructor === Array
```