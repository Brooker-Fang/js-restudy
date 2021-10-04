## async/await
+ async使得后面的function始终返回一个promise，无论function返回的是普通值还是promise
+ async本质是generator的语法糖
  + 内置了执行器，相当于自动执行了generator的next方法
  + await后面可以是promise或普通function，而yield后面必须是thunk函数或promise对象
+ await 后面跟着的是promise对象，如果是原始值也会转为Promise对象
  + 如await 2 其实就是 await new Promise((resolve, reject) => resolve(2))
## 如果返回值
```js
async function test() {
  let res = await 2
  console.log('test')
  return res
}
console.log(test())
test().then(res => {
  console.log(res)
})
async function test2() {
  let res = await test()
  console.log(11,res)
  return res
}
test2()
```