/* 
  1、Promise是一个类, 传入一个接收两个参数的回调函数，初始化时立即执行回调函数
  2、Promise有三种状态，分别为成功、失败、等待 [fulfilled, rejected, pending]
     状态确定后就不可更改
  3、resolve和reject是用来更改状态的
  4、then主要作用：如果状态是成功，则调用成功的回调，否则调用失败的回调
  5、将成功之后的值作为 成功回调的参数，失败的原因作为 失败回调的参数
  异步逻辑处理：
    new Promise((resolve, rejected) => {
      setTimeout(() => {
        resolve('成功')
      }, 2000)
    })
    promise.then 调用时，promise的状态可能还未改变 
    处理逻辑：
      1 保存成功回调 和 失败回调
      2 this.resolve和this.rejected调用时 判断 当前实例所保存的 成功或失败回调 有没有存在，存在则调用
*/
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject)
  }
  status = PENDING
  value = undefined
  error = undefined
  successCallback = undefined
  failCallback = undefined
  resolve = (val) => {
    if (this.status !== PENDING) return false;
    // 将状态更改为成功
    this.status = FULFILLED
    // 保存成功之后的值
    this.value = val
    // 处理异步逻辑
    // 判断成功回调是否存在，存在则调用
    this.successCallback && this.successCallback(this.value)
  }
  reject = (error) => {
    if (this.status !== PENDING) return false;
    // 失败
    this.status = REJECTED
    // 保存失败原因
    this.error = error
    // 处理异步逻辑
    // 判断成功回调是否存在，存在则调用
    this.failCallback && this.failCallback(this.error)
  }
  then = (successCallback, failCallback) => {
    if(this.status === FULFILLED) {
      successCallback(this.value)
    } else if(this.status === REJECTED) {
      failCallback(this.error)
    } else {
      // 当前状态是等待状态
      // 保存成功回调 和 失败回调
      this.successCallback = successCallback
      this.failCallback = failCallback
    }
  }
}
let p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功')
  },2000)
  // resolve('成功')
  // reject('失败')
})
p.then((val) => {
  console.log(val)
}, (error) => {
  console.log(error)
})