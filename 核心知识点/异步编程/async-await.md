## 如果返回值
```js
async function test() {
  let res = await 2
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