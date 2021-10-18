```js

function myBind(context, ...args) {
  let ctx = context || window
  let fn = this
  let bound = function(...args2) {
    return fn.call(this instanceof bound ? this : ctx)
  }
  let noop = function () {}
  noop.prototype = this.prototype
  bound.prototype = new noop()
  return bound
}

function myCreate(proto) {
  let noop = function() {}
  noop.prototype = proto
  return new noop()
}
function debounce(fn, wait, immediate) {
  let timer = null
  return function(...args) {
    let self = this
    if(!immediate) {
      timer && clearTimeout(timer)
      timer = setTimeout(() => {
        fn.call(self, ...args)
      }, wait)
    } else {
      if(!timer) {
        timer = setTimeout(() => {
          fn.call(self, ...args)
          timer = null
        }, wait)
      }
    }
  }
}
function throttle(fn, wait) {
  let last = null 
  return function(...args) {
    let self = this
    let now = +new Date()
    if (!last || now-last >= wait) {
      last = now
      fn.call(self, ...args)
    }
  }
}
class EventEmitter {
  callbacks = {}
  on = (name, cb) => {
    let cbs = this.callback[name] || []
    cbs.push(cb)
    callbacks[name] = cbs
  }
  emit = (name, ...args) => {
    let cbs = this.callback[name] || []
    cbs.forEach(cb => {
      cb(...args)
    })
  }
  off = (name, cb) => {
    let cbs = this.callback[name] || []
    callback[name] = cbs.filter(cb => cb !== cb)
  }
  once = (name, cb) => {
    let wrapFn = function(...args) {
      cb(...args)
      this.off(name, cb)
    }
    this.on(name, warpFn)
  }
}

Object.keys
Object.getOwnPropertyNames
Reflect.ownKeys
function deepClone(obj, weakMap = new WeakMap) {
  if (obj === null || typeof obj !== 'object') return obj
  if(weakMap.has(obj)) {
    return weakMap.get(obj)
  }
  let tar = new obj.constructor()
  weakMap.set(obj, tar)
  Reflect.ownKeys((key) => {
    if(obj.hasOwnProperty(key)) {
      tar[key] = deepClone(obj[key], weakMap)
    }
  })
}
function flat(arr) {
  return arr.reduce((prev,current) => {
    return prev.concat(Array.isArray(current) ? flat(current) : current)
  }, [])
}
Array.isArray
Object.prototype.toString.call(arr) === '[object String]'
arr instanceof Array

function curry(fn, ...args) {
  let fnLen = fn.length
  let argLen = args.length
  if(fnLen <= argLen) {
    fn(...args)
  } else {
    return function(...otherArgs) {
      return curry(fn, ...args, ...otherArgs)
    }
  }
}
function JSONP({url, callback, params}) {
  let callbackId = JSONP.callbackId || 1
  let callbacks = JSONP.callbacks || []
  callbacks[callbackId] = callback
  params.cb = `JSONP.callbacks[${callbackId}]`
  let paramsStr = Object.create(params).reduce((prev, key, index) => {
    return prev + (index === 0 ? '?' : '&') + key + '=' + params[key]
  }, url)
  let script = document.createElement('script')
  script.setAttribute('src', paramsStr)
  document.body.appendChild(script)
  JSONP.callbackId++
}
function color16() {
  return '#'+Math.floor(Math.random() * 0xfffff).toString(16).pedEnd(6, '0')
}
function createImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.load = function() {
      resolve()
    }
    img.onerror = function(e) {
      reject(e)
    }
    img.src = url
  })

}

```

