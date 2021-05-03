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
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
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
      this.successCallback.shift()()
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
      this.failCallback.shift()()
    }
  }
  then = (successCallback, failCallback) => {
    // 如果then方法没有传递函数，给个默认函数
    successCallback = successCallback ? successCallback : (val) => val
    failCallback = failCallback ? failCallback : (error) => { throw error }  
    // 创建新的promise并返回，用于支持链式调用
    let p2 = new MyPromise((resolve, reject) => {
      // 立即执行
      if(this.status === FULFILLED) {
        setTimeout(() => { // 为了能获取到p2, 使用异步代码
          try {
            let res = successCallback(this.value)
            // resolve(res)
            resolvePromise(p2, res, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
        
      } else if(this.status === REJECTED) {
        setTimeout(() => {
          try {
            let res = failCallback(this.error)
            // resolve(res)
            resolvePromise(p2, res, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else {
        // 当前状态是等待状态
        // 保存成功回调 和 失败回调
        this.successCallback.push(() => { 
          setTimeout(() => { // 为了能获取到p2, 使用异步代码
            try {
              let res = successCallback(this.value)
              // resolve(res)
              resolvePromise(p2, res, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let res = failCallback(this.error)
              // resolve(res)
              resolvePromise(p2, res, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })
    
    return p2 // 
  }
  /* 
   1、通过调用then 获取结果，并在then回调中调用 finally所接收的回调函数
   2、finally执行后，依旧需要返回promise，才能支持链式调用
  */
  finally (cb) {
    return this.then((val) => {
      return MyPromise.resolve(cb()).then(() => val);
      // cb()
      // return val
    }, (error) => {
      return MyPromise.resolve(cb()).then(() => { throw error });
      // cb()
      // throw error
    })
  }
  catch (failCallback) {
    return this.then(undefined, failCallback)
  }
  /* 
    1、判断传入的值是否是promise，如果是promise则直接返回
    2、如果是普通值，则需要创建一个新的promise，再返回, 并将传入的值作为新promise的结果值
  */
  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value))
  }
  /* 
   1、遍历传入的数组，创建返回的结果数组。
   2、如果是普通值则直接返回，如果是promise，则等待promise.then执行，将结果存入
   3、all执行后，会返回的是一个promise，并将结果数组作为返回结果，即then接收的结果
   4、只有结果数组和传入的数组 长度一致，才返回promise
  */
  static all (arr) {
    let result = []
    let index = 0
    
    return new MyPromise((resolve, reject) => {
      function addData (key, val) {
        result[key] = val
        index++;
        if (index === len) {
          resolve(result)
        }
      }
      const len = arr.length
      for(let i = 0; i < len; i ++) {
        let current = arr[i]
        if (current instanceof MyPromise) {
          current.then(val => addData(i, val), error => reject(error))
        } else {
          addData(i, arr[i])
        }
      }
    })
  }
}
/* 
  0、判断promise.then 返回值是不是自己本身，是的话抛出异常，并设置为失败
  1、判断res的值是普通值还是promise对象
  2、如果是普通值  直接调用resolve
  3、如果是promise对象 查看promise对象返回的结果
  4、再跟进promise对象返回的结果  决定调用resolve 还是调用reject
*/
function resolvePromise(promise2, res, resolve, reject) {
  if (promise2 === res) {
    return reject(new TypeError('Chaining cycle detected for promise  '))
  }
  if (res instanceof MyPromise) {
    // promise对象
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
/* let p2 = new MyPromise((resolve, reject) => {
  resolve('p2 resolve')
})
// 支持链式调用
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
}) */

// 实现 .then方法 返回自己本身 会抛出异常
let normalP = new MyPromise((resolve, reject) => {
  resolve(100)
})
let normalP2 = normalP.then(() => {
  return normalP2
})
normalP2.then(() => {}, (error) => {
  console.log('error===', error.message)
})
// 实现 all方法
function allP1 () {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('all p1 resolve')
    }, 2000)
  })
}
function allP2 () {
  return new MyPromise((resolve, reject) => {
    resolve('all p2 resolve')
  })
}
// MyPromise.all(['1', '2', allP1(), allP2(), '3']).then(res => {
//   console.log('all res == ', res)
// })

MyPromise.resolve(100).then(v => console.log('static resolve ' + v))
MyPromise.resolve(allP1()).then(v => console.log('static resolve ' + v))

allP2().finally(() => {
  console.log('finally cb')
  return allP1()
}).then((val) => {
  console.log('finally then val ===' + val)
}, (error) => {
  console.log('finally then error ===' + error)
}) 
