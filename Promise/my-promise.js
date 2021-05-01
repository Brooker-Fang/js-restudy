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
  successCallback = [] // then方法多次调用，把回调函数存储到数组
  failCallback = []
  resolve = (val) => {
    if (this.status !== PENDING) return false;
    // 将状态更改为成功
    this.status = FULFILLED
    // 保存成功之后的值
    this.value = val
    // 处理异步逻辑
    // 判断成功回调是否存在，存在则调用
    // this.successCallback && this.successCallback(this.value)
    while(this.successCallback.length) {
      this.successCallback.shift()(this.value)
    }
  }
  reject = (error) => {
    if (this.status !== PENDING) return false;
    // 失败
    this.status = REJECTED
    // 保存失败原因
    this.error = error
    // 处理异步逻辑
    // 判断成功回调是否存在，存在则调用
    // this.failCallback && this.failCallback(this.error)
    while(this.failCallback.length) {
      this.failCallback.shift()(this.error)
    }
  }
  then = (successCallback, failCallback) => {
    // 创建新的promise并返回，用于支持链式调用
    let p2 = new MyPromise((resolve, reject) => {
      // 立即执行
      if(this.status === FULFILLED) {
        let res = successCallback(this.value)
        // resolve(res)
        /* 
         1、判断res的值是普通值还是promise对象
         2、如果是普通值  直接调用resolve
         3、如果是promise对象 查看promise对象返回的结果
         4、再跟进promise对象返回的结果  决定调用resolve 还是调用reject
        */
       resolvePromise(res, resolve, reject)
      } else if(this.status === REJECTED) {
        failCallback(this.error)
      } else {
        // 当前状态是等待状态
        // 保存成功回调 和 失败回调
        this.successCallback.push(successCallback)
        this.failCallback.push(failCallback)
      }
    })
    
    return p2 // 
  }
}
function resolvePromise(res, resolve, reject) {
  if (res instanceof MyPromise) {
    // promise对象
    console.log('is promise')
    res.then(val => resolve(val), (error) => reject(error))
  } else {
    // 普通值
    resolve(res)
  }
}
let p = new MyPromise((resolve, reject) => {
  // 异步
  // setTimeout(() => {
  //   resolve('成功')
  // },2000)
  resolve('成功')
  // reject('失败')
})
let p2 = new MyPromise((resolve, reject) => {
  resolve('p2 resolve')
})
p.then((val) => {
  console.log(val)
  // 返回普通值
  return p2
}, (error) => {
  console.log(error)
}).then((v) => {
  console.log(v)
  // 返回promise
  return p2
})
p.then(v => {
  console.log(v)
}, (error) => {
  console.log(error)
})
p.then(v => {
  console.log(v)
}, (error) => {
  console.log(error)
})