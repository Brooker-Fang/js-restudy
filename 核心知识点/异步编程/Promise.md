
面试题：
https://juejin.cn/post/6844904077537574919#heading-21
## 5中静态方法
## Promise.all(promiseArr)
+ 接受一个promise数组作为参数，当所有promise都settled时，promise.all才会resolve，并且将结果数组传入resolve，并且结果数组的顺序与传入的promise数组一致
+ 如果其中一个promise，Promise.all 就会立即被reject，而被reject的error成为了整个Promise.all的结果
```js

```
### Promise.all 失败问题
+ 如果数组中任意一个失败，都会导致promise失败，但是其中一个失败亦不影响其他promise正常执行
+ promise.all(arr).catch只会捕获最先被reject失败状态的值
+ 如果要捕获每个值, 需要在每一个promise.catch捕获
```js
Promise.all(arr.map(item => axios.item.then(res => ()).catch(e => ())))
```

## Promise.allSettled(promiseArr)
+ 和Promise.all类似，但是无论传入的promise数组，是否有失败的，最终结果一定会成功，即只会走.then（如果代码没有出错）
+ 即会等待所有promise都被settle，无论结果如果，并且结果数组具有 
  + {status: 'fulfilled', value: result} 对于成功的响应
  + {status: 'rejected', reason: error} 对于error


## Promise.race(promiseArr)
+ 只等待第一个settle的promise并获取其结果或error


## Promise.resolve(val) 使用给定的value创建一个resolved的promise
## Promise.reject(val) 使用给定的error创建一个rejected的promise


# 面试题
## 描述一下Promise
+ Promise是一个对象，表示异步操作的最终完成或者失败，一般配合.then,.catch使用
+ Promise有三种状态，待执行Pending、Fulfilled、Rejected
+ Promise状态经过改变后就不在改变
+ Promise允许链式调用，then\cache\finally方法返回新的Promise
+ then\finally 都是微任务

## promise链式调用then 和 同一个promise多次调用then的区别
链式调用then，都会返回一个新的promise，所以上一个then的结果会传递给新的promise。
而同一个promise多次调用then，接收的都是同一个结果
```js
const promise = new Promise((resolve, reject) => {
  resolve(1)
}).then(res => {
  console.log(res)
    return 2
}).then(res => {
  console.log(res)
})
// 1 2

const promise = new Promise((resolve, reject) => {
  resolve(1)
})
promise.then(res => {
  console.log(res)
    return 2
})
promise.then(res => {
  console.log(res)
})
// 1 1
```
## 返回任意一个非 promise 的值都会被包裹成 promise 对象
```js
Promise.resolve().then(() => {
  return new Error('error') // 这里相当于 return Promise.resolve(new Error)
}).then((val) => {
  console.log('then ' + val)
}).catch(e => {
  console.log('catch' + val)
})
// then Error: error
```

## 如果promise.then传入的不是函数，则会被忽略
```js
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then({})
  .then(console.log)
  // 前面3个then都被忽略
```

## finally和then一样也是一个微任务，return没有效果，
```js
Promise.resolve('1')
  .then(res => {
    console.log(res)
  })
  .finally(() => {
    console.log('finally')
  })
Promise.resolve('2')
  .finally(() => {
    console.log('finally2')
  	return 'finally2'
  })
  .then(res => {
    console.log(res)
  })
```
打印：1 finally2 finally 2

### 通过catch捕获到reject后，在catch后面还能继续执行then方法吗？如果能执行执行的是第几个回调函数

```js

Promise.reject(2)
    .catch(r => {
        // 捕获到错误，执行
        console.log('catch1');
    })
    // 错误已经被捕获，后边的`then`都顺序执行，且只执行`then`的第一个回调（resolve的回调）
    .then(v => {
        console.log('then1');
    }, r => {
        console.log('catch2');
    })
    .catch(r => {
        // 前边没有未捕获的错误，不执行
        console.log('catch3');
    })
    .then(v => {
        console.log('then2');
    }, r => {
        console.log('catch4');
    });
    
```
打印：cache1 then1 then2