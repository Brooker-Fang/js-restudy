```js
let p2 = new MyPromise((res, rej) => {
  res(1)
}).then(res => {
  console.log(res)
  return 3
}).then(res => {
  console.log(res)
}
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
class MyPromise {
  status = PENDING
  value = null
  error = null
  successCallbacks = []
  failCallbacks = []
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch(e) {
      this.reject(e)
    }
  }
  resolve = (val) => {
    if(this.status === PENDING) {
      this.status = FULFILLED
      this.value = val
      while(this.successCallback.length) {
        this.successCallback.shift()(val)
      }
    }
  }
  reject = (error) => {
    if(this.status === PENDING) {
      this.status = REJECTED
      this.error = error
      while(this.fallCallbacks.length) {
        this.failCallbacks.shift()(error)
      }
    }
  }
  then = (successCallback, failCallback) => {
    successCallback = typeof successCallback === 'function' ? successCallback :(val) => val
    failCallback = typeof failCallback === 'function' ? failCallback :(error) => {throw error}
    let p2 = new MyPromise((resolve, reject) => {
      if(this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = successCallback(this.value)
            resolvePromise(p2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.error)
             resolvePromise(p2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        })

      } else {
        this.successCallbacks.push(() => {
           setTimeout(() => {
            try {
              let x = successCallback(this.value)
              resolvePromise(p2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
        this.failCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = failCallback(this.error)
              resolvePromise(p2, x, resolve, reject)
            } catch(e) {
              reject(e)
            }
          })
        })
      }
    })
    return p
  }
  static resolve = (val) => {
    if (val instanceof MyPromise) return val
    return new MyPromise((resolve, reject) => resolve(val))
  }
  finally = (cb) => {
    return this.then((val) => {
      return MyPromise.resolve(cb()).then(() => val)
    }, (err) => {
      return MyPromise.resolve(cb()).then(() => { throw error });
    })
  }
  all = (arr) => {
    let index = 0
    let res = []
    return new MyPromise((resolve,reject) => {
      
      function addDate(key, val) {
        res[key] = val
        index++
        if(res.length === index) {
          resolve(res)
        }
      }
      arr.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(val => addDate(index, val))
        } else {
          addDate(index, promise)
        }
      })
    })
  }
}
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    reject(new TypeError(''))
  } else if (x instanceof MyPromise) {
    res.then(val => resolve(val), (err) => reject(err))
  } else if (x && typeof x ==='object' || typeof x === 'function') {
    let then = x.then
    try {
      then.call(x, (val)=> {
      resolvePromise(promise2, val, resolve, reject)
      }, (err) => {
        reject(err)
      })
    } catch (e) {
      reject(e)
    }
  } else {  
    resolve(x)
  }
}
const arr = [1,2,3,1,2,3]
const arr = [...new Set(arr)
function MyNew(fn, ...args) {
  let obj = Object.create(fn.prototype)
  let res = fn.call(obj, ...args)
  return res && typeof res === 'object' ? res : obj
}
function MyInstanceof(left, right) {
  let leftPro = left.__protp__
  let rightPro = right.prototype
  while(leftPro) {
    if(leftPro === rightPro) {
      return true
    }
    leftPro = leftPro.__proto__
  }
  return false
}
function MyBind(context, ...args) {
  const ctx = context || window
  const fn = this
  const bound = function(...args2) {
    return fn.call(this instanceof bound ? this : ctx, ...args, ...args2)
  }
  const noop = function(){}
  bound.prototype = noop.prototype
  return bound
}
function MyApply(context, ...args) {
  const ctx = context || window
  args = args || []
  console.log(args)
  let sym = Symbol()
  ctx[sym] = this
  ctx[sym](...args)
  delete ctx[sym]
}
function Person(name) {
  this.name = name
}
function Man(name, age) {
  Person.call(this, name)
  this.age =age
}
function inherit(child, parent) {
  let childPro = Object.prototype(parent.prototype)
  child.prototype = childPro
  child.prototype.constructor = child
}
function MyObjectCreate(prototype) {
  function noop() {}
  noop.prototype = prototype
  return new noop()
}
function MyDebounce(fn, wait, immediate = false) {
  let timer = null;
  return function(...args) {
    let self = this
    if(immediate) {
      if(!timer) {
        timer = setTimeout(()=> {
          fn.call(self, ...args)
        }, wait)
      }
    } else {
      timer && clearTimeout(timer)
      timer = setTimeout(()=> {
        fn.call(self, ...args)
      }, wait)
    }
  }
}
function throttle(fn, wait) {
  let last = null
  return function(...args) {
    let self = this
    let now = +new Date()
    if(!last ||  now - last > wait) {
      fn.call(self, ...args)
      last = now
    }
  }
}
Object.keys()
Object.getOwnPropertyNames()
Reflect.ownKeys()
function deepClone() {
  
}
```