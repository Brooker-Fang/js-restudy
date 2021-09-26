# Event-loop事件循环
+ Event-loop是一种代码执行机制，js线程会有一个任务执行栈，任务分为同步任务和异步任务，
+ 同步任务必须执行完成后才会继续往下执行，异步任务则会被放入任务队列
+ 异步任务又分为 宏任务和微任务
+ 当主线程的同步任务执行完后，会将当前微任务队列 推入 主线程执行栈，执行完所有微任务后，在将宏任务推入执行栈
+ 宏任务执行过程中，如果遇到 异步任务，依旧会推入任务队列，以此循环操作，就是Event-loop执行机制
+ setTimeout、setInterval属于宏任务，Promise.then cache finally、MutationObserver 、process.nextTick属于微任务

简单理解：
+ 每个任务（函数）的执行过程都有可能产生宏任务和微任务
+ 每个任务执行的最后，需要先执行完所有的微任务，在开始执行宏任务

## Node和浏览器事件循环的不同
差异在NodeV10之前，Node11之后就没有差异了。
Node在执行微任务之前，会先去执行process.nextTick里的任务，执行完后，才会去执行微任务。
Node事件循环分为几个阶段，每个阶段执行完就会去执行微任务。而浏览器则是在宏任务执行完后去执行微任务
## 思考题
### 案例一
```js
setTimeout(() => console.log(1), 0)
setTimeout(() => console.log(2), 1000)

Promise.resolve().then(()=> {
  setTimeout(() => console.log(3), 0)
  setTimeout(() => console.log(4), 1000)
  console.log(5)
  Promise.resolve().then(() => console.log(6))
})
.then(() => console.log(7))

setTimeout(() => console.log(8), 0)
setTimeout(() => console.log(9), 1000)
```
567183294
其实可以把微任务按顺序 放到代码下方
```js
setTimeout(() => console.log(1), 0)
setTimeout(() => console.log(2), 1000)

.then(() => console.log(7))

setTimeout(() => console.log(8), 0)
setTimeout(() => console.log(9), 1000)
setTimeout(() => console.log(3), 0)
  setTimeout(() => console.log(4), 1000)
  console.log(5)
  console.log(6)
  console.log(7)
```
### 案例二
```js
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
```
转换后
```js
// 第一轮宏任务
console.log('1');
console.log('7');
console.log('6');
console.log('8')
// 第二轮
console.log('2');
console.log('4');
console.log('3');
console.log('5');
// 第三轮宏任务
console.log('9');
console.log('11');
console.log('10');
console.log('12')
```

```js
function waitFn() {
  let count = 1
  return new Promise((resolve, reject)=> {
    setTimeout(() => {
      console.log(count++)
      resolve()
    }, 1000)
  })
}
async function main() {
  console.log('start')
  const a = waitFn()
  console.log('a')
  const b = waitFn()
  console.log('b')
  const c = waitFn()
  console.log('c')
  await a
  console.log('e')
  await b
  console.log('f')
  await c
  console.log('end')
}
main()
// start 1 a 2 b 3 c
// 1s后 打印 e f end
async function main() {
  console.log('start')
  const a = await waitFn()
  console.log('a')
  const b = await waitFn()
  console.log('b')
  const c = await waitFn()
  console.log('c')
}
// start  2 b 3 c
// 1s后 打印 1 a
// 再1s后 打印 2 b
// 再1s后 打印 3 c
```
async 函数中如果没有使用await，不会阻碍同步任务的运行


### 案例三
```js
async function async1() {
    console.log("a1 start");
    await  async2();
    console.log("a1 end");
}
async function async2() {
    console.log( 'a2');
}
console.log("script start");
setTimeout(function () {
    console.log("settimeout");
},0);
async1();
new Promise(function (resolve) {
    console.log("promise1");
    resolve();
}).then(function () {
    console.log("promise2");
});
console.log('script end');
```
转换为
```js
/* 
  script start
  a1 start
  a2
  promise1
  script end

  a1 end
  promise2
  settimeout
*/
```

### 案例四
```js
function wait() {
  return new Promise(resolve =>
    setTimeout(resolve, 1000)
  )
}
async function main1() {
  const x = await wait();
  const y = await wait();
  const z = await wait();
  console.log('end');
}
main1(); 
async function main2() {
  const x = wait();
  const y = wait();
  const z = wait();
  await x;
  await y;
  await z;
  console.log('end');
}
main2(); 

async function main3() {
  const x = wait();
  const y = wait();
  const z = wait();
  x,y,z;
  console.log('end');
}
main3(); 
```
main2：3s多后打印end
main2：1s多后打印end，相当于同时执行了3个
main3: 同步打印end