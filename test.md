```js
let p2 = new MyPromise((res, rej) => {
  res(1)
}).then(res => {
  console.log(res)
  return 3
}).then(res => {
  console.log(res)
})
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
class MyPromise{
  status = PENDING
  value = null
  error = null
  successCbs = []
  failCbs = []
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch(e) {
      this.reject(e)
    }
  }
  resolve = (val) => {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = val
      while(this.successCbs.length) {
        this.successCbs.shift()(this.value)
      }
    }
  }
  reject = (error) => {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.error = error
      while(this.failCbs.length) {
        this.failCbs.shift()(this.error)
      }
    }
  }
  then(successCallback, failCallback) {
    successCallback = successCallback ? successCallback : (val) => val
    failCallback = failCallback ? failCallback : (error)=> { throw error}
    let p2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        let res = successCallback(this.value)
        if (res instanceof MyPromise) {
         res.then(value => resolve(value))
        } else {
          resolve(res)
        }
      } else if(this.status === REJECTED) {
        
      } else {
        this.successCbs.push(()=> {
          let res = successCallback(this.value)
          if (res instanceof MyPromise) {
            res.then(value => resolve(value))
          } else {
            resolve(res)
          }
        })
        this.failCbs.push(()=> {
          reject(this.error)
        })
      }
    })
    return p2
  }
  static resolve(val) {
    if(val instanceof MyPromise) return val
    return new MyPromise((resolve, reject) => resolve(val))
  }
}
```