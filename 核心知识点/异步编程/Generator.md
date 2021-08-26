## generator函数
+ 要创建generator函数，需要用function*
+ generator函数被调用时，不会运行其代码，而是返回 generator object的特殊对象来管理流程。
+ 只有调用 generator obj的next才会开始执行函数，并且
```js
function* gen(){
  console.log(11)
  yield 1
  yield () => 2
  yield () => return new Promise(resolve => resolve()) 
  return 3
}
const g = gen()
console.log(g)
console.log(g.next())
```
+ next()调用后返回具有两个属性的对象
```js
/* 
  obj = {
    value: yield 后面的值 或者 yield 后面函数的返回值
    done: 如果generator函数以及执行完成，则为true，否则为false
  } 
*/
function* gen(){
  console.log(11)
  let val = 0
  val = yield 1
  console.log(val)
  val = yield 2
  console.log(val)
  val = yield new Promise(resolve => resolve(3)) 
  console.log(val)
  return 3
}
const g = gen()
console.log(g.next())
console.log(g.next())
console.log(g.next())
```
+ generator 是可迭代的，可以用for...of 循环遍历它所有的值
```js
function* gen() {
  yield 1
  yield 2
  return 3
}
const g = gen()
for(let val of gen) {
  console.log(val)
}
let arr = [1, ...gen]
```
+ yield* 特殊语法可以将另一个generator函数 嵌入到本generator中
```js
function* gen2(){
  yield 2
  yield 3
  return 4
}
function* gen() {
  yield 1
  yield* gen2()
  return 5
}
```