
<!-- TODO -->
Intersection Observer API 提供了一种异步检测目标元素与祖先元素或 视口 相交情况变化的方法。

## 使用场景
+ 图片懒加载——当图片滚动到可见时才进行加载
+ 内容无限滚动——也就是用户滚动到接近内容底部时直接加载更多，而无需用户操作翻页，给用户一种网页可以无限滚动的错觉
+ 检测广告的曝光情况——为了计算广告收益，需要知道广告元素的曝光情况
+ 在用户看见某个区域时执行任务或播放动画

## 使用

Intersection Observer API 会注册一个回调函数，每当被监视的元素进入或者退出另外一个元素时(或者 viewport )，或者两个元素的相交部分大小发生变化时，该回调方法会被触发执行。
注意：可以安装intersection-observer库要增加 api的兼容性
```js
const options = {
  root: document.querySelector('#scrollArea'),
  rootMargin: '0px',
  threshold: 1.0
}
const callback =(entries, observer) => {
  entries.forEach(entry => {})
}
// 创建观察者
const observer  = new IntersectionObserver(callback, options);
// 目标元素
const target = document.querySelector('#listItem');
// 监听
observer.observe(target);
```
### 参数说明

#### callback
```js
const callback =(entries, observer) => {
  entries.forEach(entry => {})
}
```
当元素可见比例超过指定阈值后，会调用一个回调函数，此回调函数接受两个参数：
entries
一个IntersectionObserverEntry对象的数组，每个被触发的阈值，都或多或少与指定阈值有偏差。如果同时有两个被观察的对象的可见性发生变化，entries数组就会有两个成员。
IntersectionObserverEntry对象:https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserverEntry
observer
被调用的IntersectionObserver实例。
#### root:
指定根(root)元素，用于检查目标的可见性。必须是目标元素的父级元素。如果未指定或者为null，则默认为浏览器视窗。
#### rootMargin
根(root)元素的外边距。类似于 CSS 中的 margin 属性，比如 "10px 20px 30px 40px" (top, right, bottom, left)。如果有指定 root 参数，则 rootMargin 也可以使用百分比来取值。该属性值是用作 root 元素和 target 发生交集时候的计算交集的区域范围，使用该属性可以控制 root 元素每一边的收缩或者扩张。默认值为0。
#### threshold
可以是单一的 number 也可以是 number 数组，target 元素和 root 元素相交程度达到该值的时候 IntersectionObserver 注册的回调函数将会被执行。如果你只是想要探测当 target 元素的在 root 元素中的可见性超过50%的时候，你可以指定该属性值为0.5。如果你想要 target 元素在 root 元素的可见程度每多25%就执行一次回调，那么你可以指定一个数组 [0, 0.25, 0.5, 0.75, 1]。默认值是0 (意味着只要有一个 target 像素出现在 root 元素中，回调函数将会被执行)。该值为1.0含义是当 target 完全出现在 root 元素中时候 回调才会被执行。