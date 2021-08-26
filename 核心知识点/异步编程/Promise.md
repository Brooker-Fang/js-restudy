## Promise.all

### Promise.all 失败问题
+ 如果数组中任意一个失败，都会导致promise失败，但是其中一个失败亦不影响其他promise正常执行
+ promise.all(arr).catch只会捕获最先被reject失败状态的值
+ 如果要捕获每个值, 需要在每一个promise.catch捕获
```js
Promise.all(arr.map(item => axios.item.then(res => ()).catch(e => ())))
```

## Promise.allSettled
+ 和Promise.all类似，但是无论传入的promise数组 是否有失败的，最终结果一定会成功，即只会走.then（如果代码没有出错）