
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