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
浏览器地址栏判断是搜索内容还是url，如果是搜索内容，则根据搜索引擎，合成新的有关键字的url，如果是url，则拼上协议合成新的url。
接着进行dns查询过程，先找浏览器dns服务器，操作系统dns服务器，本地host，再到根域名服务器去询问查找，找到ip地址后，让网络进程准备发起请求
先3次握手建立tcp连接，连接成功后，发起真正的请求，将数据传输到服务器，服务器响应后返回给浏览器，浏览器主线程将html文档提交给渲染进程，进入渲染阶段
渲染进程主要分几个阶段，一个是dom解析，生成dom树，一个是样式计算，计算出每个节点的样式，当这两个阶段完成然后就开始布局阶段，主要是计算每个节点在浏览器上的位置，最终生成布局树。最后就是分层和合成阶段了，先将一些节点分为多个图层，最终合成线程再将这些图层合并到一起，生成最终的页面在显示器上展示
1个符号位，11指数为，52个尾数位
js线程维护着一个任务执行栈，js任务分为同步任务和异步任务，同步任务必须执行完后才会继续执行，而异步任务进异步任务队列。异步任务又分为宏任务和微任务，当一个宏任务执行完后，会将所有微任务推入任务执行栈，微任务执行完后才会继续执行下一个宏任务，而执行宏任务过程中，如果遇到异步任务则依旧推入异步任务队列，以此循环

引用计数，引用值会维护一个引用计数，当值被引用时，则计数+1，取消引用时-1，触发gc操作时会释放引用计数为0的内存空间
标记清除，对每个活动对象进行标记，清除为被标记的值
标记整理，对每个活动对象进行标记，然后移动这些对象在内存中的位置，清除未被标记的引用值
v8内存分为新生代空间和老生代空间，
新生代回收
复制算法+标记整理
新生代内存二等分为两个内存空间，一个是对象存储的空间，一个是空闲空间，当触发gc时，对活动空间进行标记整理的操作，然后将活动对象拷贝到空闲空间，接着对之前的活动空间清除释放内存。
老生代回收
标记清除+标记整理+增量标记
老生代回收主要是标记清除算法吧，当新生代拷贝发生晋升时，如果剩余空间不足，会做标记整理的操作

强缓存主要看expires过期时间和Cache-Control字段，
x-age 存活no-store 不缓存
no-cache 走协商缓存
协商缓存看 Last-time/If-Modified-Since, Etag/If-Non/e-Match

第一次握手 客户端发消息给服务端，服务端确认客户端发送和自身接收能力没有问题
第二次握手 服务端发消息给客户端，客户端确认服务端的发送和自身的接收能力没有问题
第三次握手 客户端发消息给服务端，服务端确认客户端接收和自身发送能力没有问题

第一次挥手 客户端发消息给服务端，请求断开连接
第二次 服务端发确认消息给客户端，表明知道客户端没有数据传输，但此时连接还未断开，可能还要传输数据
第三次 服务端发送完数据后，发消息给客户端，表面已经没有数据要发送了
第四次 客户端发送确认消息给服务端，并关闭连接，服务端接收到后，也关闭
默认长连接
1.1 增加了管道化特性
1.1 增加新的请求方法
443
对称加密：用同一把钥匙加密和解密
非对称加密：公钥加密，私钥解密
混合加密
摘要算法：将不同长度的数据转为固定长度的数据，并且这个过程不可逆。不同数据转换后的肯定不同。无法通过加密后的数据推算出源数据
客户端将tls版本、加密套件、客户端参数发给服务端
服务端将选择的加密套件，服务端参数、服务端随机数、证书发给客户端
客户端验证证书，然后将客户端随机数发给服务端，此时两端都用客户端参数和服务端参数生成第三个随机数，然后在通过客户端随机数、服务端随机数和新生成的随机数生成公钥。
客户端发两个收尾消息给服务端，给之前的消息做个摘要，并加密发送给服务端验证一下
服务端同样的操作。等待俩端都验证加密解密ok，就开始加密通讯
客户端第一次发消息就把客户端参数也发给服务端，这样服务端不必等到客户端验证证书后再发参数的这段时间

需要证书
数据以虚拟的流的传输信息，数据流由一个或多个帧组成，每个帧都有流标识，最后会在服务端重新组装
一个tcp连接

