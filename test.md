```js
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
class MyPromise{
  state = PENDING
  value = null
  error = null
  successCallbacks = []
  failCallbacks = []
  constructor(exec) {
    try {
      exec(this.resolve, this.reject)
    } catch(e) {
      this.reject(e)
    }
  }
  resolve = (val) => {
    if(this.state === PENDING) {
      this.state = FULFILLED
      this.value = val
      while(this.successCallbacks.length) {
        this.successCallbacks.shift()(val)
      }
    }
  }
  then = (successCallback, failCallback) => {
    successCallback = successCallback ? successCallback : (val) => val
    failCallback = failCallback ? failCallback : (err) => {throw err}
    let p = new MyPromise((resolve, reject) => {
      if(this.state === FULFILLED) {
        setTimeout(() => {
          try {
            let res = successCallback(res)
            resolvePromise(p,res, resolve, reject)
          } catch(e) {
            reject(e)
          }
        })
      } else if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            let res = failCallback(res)
            resolvePromise(p,res, resolve, reject)
          } catch(e) {
            reject(e)
          }
        })
      } else {
        this.successCallback.push(() => {
          setTimeout(() => {
          try {
              let res = resolve(res)
              resolvePromise(p,res, resolve, reject)
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
    if(val instanceof MyPromise) return val
    return new MyPromise((resolve, reject) => resolve(val))
  }
  finally = (cb) => {
    return this.then(val => {
      return MyPromise.resolve(cb()).then(() => val)
    }, err => {
      return MyPromise.resolve(cb()).then(() => val, () => { throw err})
    })
  }
  all = (arr) => {
    let len = arr.len
    let index = 0
    let res = []
    return new MyPromise((resolve, reject)=>{
      function addDate(key, val) {
        res[key] = val
        index++
        if(index === len) {
          resolve(res)
        }
      }
      arr.forEach((item, index) => {
        if(item instanceof MyPromise) {
          item.then(val => addData(index, val), err => reject(err))
        } else {
          addDate(index, item)
        }
      })
    })
    
  }
}
function resolvePromise(p, x, resolve, reject) {
  if (p === x) {
    throw('')
  } else if (x instance MyPromise) {
    x.then(val => resolve(val))
  } else if (x && typeof x === 'Object') {
    let then = x.then
    then.call(x, (val) => {
      resolvePromise(p,val, resolve,reject)
    }, (err) => {
      reject(err)
    })
  } else {
    resolve(x)
  }
}
[...new Set(arr)]
function myNew(fn) {
  const obj = Object.create(fn.prototype)
  let res= fn()
  return res && typeof res === 'object' ? res : obj
}
function myInstanceof(left, right){
  let leftPro = left.__proto__
  let rightPro = right.prototype
  while(leftPro) {
    if(leftPro === rightPro) {
      return true
    }
    leftPro = leftPro.__proto__
  }
  return false
}
function myCall(context, ...args) {
  const ctx = context || window
  const sym = Symbol()
  const fn = this
  ctx.sym = fn
  ctx[sym](...args)
  delete ctx.sym
}
function myBind(context, ...args) {
  const ctx = context || window
  const fn = this
  const bound = function(...args2) {
    return fn.call(this instanceof bound ? this : ctx, ...args, ...args2)
  }
  const noop = function() {}
  noop.prototype = this.prototype
  bound.prototype = noop.prototype
  return bound
}
function MyCreate(prototype) {
  const noop = function(){}
  noop.prototype = prototype
  return new noop()
}
function debounce(fn, wait, immediate = false) {
  let timer = null
  if(immediate) {
    timer
  }
}
```