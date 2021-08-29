## Symbol
+ Symbol表示唯一的标识符


## 使用
```js
let s = Symbol()
// 或者 传入一个参数作为描述
let s2 = Symbol('desc')
// 可以通过Symbol的description获取描述
s2.description // desc
```
Symbol的值是唯一的，与描述无关，描述只是一个标签，不影响任何东西
```js
let id = Symbol('id')
let id2 = Symbol('id')
id === id2 // false
id == id2 // false
```
Symbol不允许隐式转换, 可以使用toString
```js
let s = Symbol('s')

+ s // Uncaught TypeError:  Cannot convert a Symbol value to a number
alert(s) // Uncaught TypeError: Cannot convert a Symbol value to a string
alert(s.toString()) // "Symbol(id)"
```
不能使用new 构造
```js
let s = new Symbol() // Uncaught TypeError: Symbol is not a constructor
```
## 使用场景
### 使用Symbol作为对象属性名
+ 可以把一些不需要被访问或者操作的属性 使用Symbol来定义
+ 因为不会被Object.keys() 或for...in 枚举到,并且JSON.stringify转换时，Symbol属性也会被跳过
+ 不过Object.assign浅拷贝时还是能拷贝的到
```js
let obj = {
  [Symbol('id')]: 'id',
  name: 'fhh'
}
for(let key in obj) {
  console.log(key)
} // name
console.log(Object.keys(obj)) // ['name']
JSON.stringify(obj) // "{\"name\":\"fhh\"}"
```

### 通过Symbol的唯一值和模块化实现类的私有属性/方法
Person模块
```js
const weight = Symbol('weight')
export default class Person{
  constructor(name, weight) {
    this.name = name
    this[weight] = weight
  }
  getWeight() {
    return this[weight]
  }
}
```
其他模块因为没有获取到Person模块的weight的Symbol值, 也没法创建一个同样的Symbol，所以没办法直接获取实例的weight属性
```js
const person = new Person('fhh', 180)
console.log(person.weight) // undefined
console.log(person[Symbol('weight')]) // undefined
console.log(person.getWeight())
```
### 使用Symbol.iterator/toPrimitive等api来改变一些内置行为，如Symbol.iterator来进行迭代操作，Symbol.toPrimitive来设置对象原始值转换
+ 迭代器需要返回包含next方法的迭代器对象, 每次迭代都会执行迭代器对象的next方法
+ next方法返回包含done和value属性的对象, 其中done为true时，会结束迭代
+ for...of的原理最终也是通过调用 obj[Symbol.iterator]() 
```js
const person = {
  [Symbol.iterator]: function() {
    let index = 1
    return {
      next() {
        return { done: index > 10, value: index++}
      }
    }
  },
  [Symbol.toPrimitive]: function() {
    return 10
  }
}
// 类型转换
1 + person === 11

// 迭代器
// 手动调用
let iterator = person[Symbol.iterator]()
console.log(iterator.next().value) // 1
console.log(iterator.next().value) // 2
console.log(iterator.next().value) // 3
// for...of自动调用
for(let key of person) {
  console.log(key)
}
```
+ 可以使用generator/yield简洁实现迭代器
```js
let person = {
  [Symbol.iterator]: function*() {
    for(let i = 0; i < 10;i++) {
      yield i
    }
  }
}
for(let key of person) {
  console.log(key)
}
```
## 全局Symbol 注册表
+ 因为Symbol值总是不同，如果希望相同描述的Symbol相等，则需要用到全局Symbol
+ 全局Symbol注册表 使用Symbol.for创建或查找，即会先对传入的key查找是否已经有 同名的Symbol，有则返回，没有则通过key创建新的Symbol
```js
let globalSymbol = Symbol.for('global')
let getS = Symbol.for('global')
getS === globalSymbol  // true
```
+ Symbol.keyFor(symbol) 通过全局 Symbol 注册表来查找 Symbol 的键
```js
Symbol.keyFor(globalSymbol) // global
```
