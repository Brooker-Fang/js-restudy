xss: 跨站脚本攻击，指往html文件或dom中注入恶意脚本，从而在用户浏览页面时理由注入的恶意脚本对用户实施攻击的一种手段
csp：内容安全策略，csp的核心思想是让服务器决定浏览器能够加载那些资源，让服务器决定浏览器是否能够执行内联js代码。
+ 本质就是建立白名单，开发者明确告诉浏览器那些外部资源可以加载和执行，我们只需要配置规则，如何拦截是由浏览器自己实现的，可以通过这种方式尽量减少XSS攻击
+ 通常有两种方式来开启csp
  + 一种是设置http header 的Content-Security-Policy
  + 一种是设置meta标签的方式<meta http-equiv="Content-Security-Policy">
## 危害
+ 可以窃取Cookie信息，如通过document.cookie获取cookie
+ 可以监听用户行为，如addEventListener添加键盘事件，获取用户输入
+ 可以修改dom，如伪造假的登录窗口，用来欺骗用户输入账号密码
...

## 恶意脚本怎么注入
+ 存储型 XSS 攻击：具有攻击性的脚本被保存到了服务器端，如通过表单提交，将xss代码保存到了数据库
+ 反射型 XSS 攻击：指xss代码在请求的url中，服务器又把xss代码返回给浏览器。
+ 基于dom的XSS攻击：通过DOM动态修改页面内容

## 如何阻止攻击
+ 服务器对输入脚本进行过滤或转码
+ 利用好csp来防御
  + 限制加载其他域下的资源文件
  + 禁止第三方域提交数据
  + 禁止执行内联脚本和未授权的脚本
+ 将Cookie设置HttpOnly属性，document.cookie就无法获取cookie，即过js脚本将无法读取到cookie信息