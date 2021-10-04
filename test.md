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
  return function(...args) {
    let self = this
    if(!immediate) {
      timer && clearTimeout(timer)
      timer = setTimeout(() => {
        fn.call(self, ...args)
      })
    } else {
      if(!timer) {
        timer = setTimeout(() => {
          timer = null
          fn.call(self, ...args)
        })
      }
    }
  }
  
}
Object.keys()
Object.getOwnPropertyNames()
Reflect.ownKeys()
function deepClone(obj, weakMap = new WeakMap()) {
  if(obj === null || typeof obj! === 'object') return obj
  if(weakMap.has(obj)) {
    return weakMap.get(obj)
  }
  let tar = new obj.constructor()
  weakMap.set(obj, tar)
  Reflect.ownKeys(obj).forEach(key => {
    if(Object.hasOwnProperty(key)) {
      tar[key] = deepClone(obj[key])
    }
  })
  return tar
}
function bfsClone(obj) {
  let map = new WeakMap()
  let tar = new obj.constructor()
  let queue = []
  queue.push([tar, obj])
  map.set(obj, tar)
  while(queue.length) {
    let [to, from] = queue.shift()
    Reflect.ownKeys(from).forEach(key => {
      if(Object.hasOwnProperty(key)) {
        let item = obj[key]
        if(map.has(item)) {
          to[key] = map.get(item)
          return
        }
        if(item && typeof item === 'object') {
          let tar = new item.constructor()
          to[key] = tar
          queue.push([tar, item])
          map.set(item, tar)
        } else {
          to[key] = item 
        }
      }
    })
  }
}
function curry(fn, ...args) {
  let len = fn.length
  let argLen = args.length
  if (len <= argLen) {
    fn(...args)
  } else {
    return function(...args2) {
      return curry(fn, ...args, ...args2)
    }
  }
}
function Person() {}
function Man() {}
Man.prototype = new Person()
Man.prototype.constructor = Man

function Man() {
  Person.call()
}
function extendByPro(obj) {
  const obj = Object.create(obj)
  return obj
}


function inherit(child, parent) {
  const pro = Object.create(parent.prototype)
  child.prototype = pro
  child.prototype.constructor = child
}
function Person() {}
function Man() {}
inherit(Man, Person)
function Man() {
  Person.call()
}
!import => 行内元素 => id选择器 => 类选择器、伪类、属性 => 元素、伪元素选择器 => 通配符、兄弟选择器
obj、p2、window、window\window\p2\obj\p2\obj\obj\window
```