## 常见属性
+ name 项目名称
+ version 版本号
+ private: 是否设置为私有项目。设置为true 则不能推送到npm 仓库，防止将私有项目 发布到npm仓库
+ main：当前npm项目的入口文件。一般开源项目需要main来指定入口文件
+ scripts : 用于配置一些脚本命令，以键值对的形式存在
  + npm run dev 和 npm dev区别？
+ dependencies：
  + 无论开发环境还是生产环境都需要依赖的包
  + 通常是一些项目实际开发中用到的一些库模块，如vue、vuex、axios
+ devDependencies：
  + 有些包在生产环境是不需要的，如 webpack、babel
  + 可以通过npm install --save-dev 写入 devDependencies属性
+ peerDependencies：
  + 还有一种项目依赖关系是对等依赖，即你依赖的这个包，它又必须依赖另一个包，如 element-plus 依赖于 vue3，ant design 依赖于react、react-dom

+ engines：
  + 用于指定Node和npm的版本号
  + 在安装过程中，会先检查对应的引擎版本，如果不符合就会报错
  + 还可以指定所在的操作系统，如 “os” ：["linux"]

+ 还有一些其他工具需要自定义的一些属性，如browserslist 主要用于webpack使用
+ browserslist（不属于package.json本身的属性，主要用于webpack使用）
  + 用于配置打包后的js浏览器的兼容情况
## 依赖的版本管理
npm的包版本通常需要遵守 semver版本规范
+ semver: https://semver.org/lang/zh-CN/
### 安装版本时，^x.y.z 和 ~x.y.z表示的含义
+ 如果版本号有个^，在执行npm install时，x保持不变，y和z永远安装最新的版本
+ ~表示x和y保持不变，z永远安装最新的版本
+ 但是，如果有package-lock.json锁死版本，则还是安装lock里锁死的版本号

## npm install 命令
+ 全局安装 npm install -g : 安装到本机的node指定的全局包文件里，并且将库的可执行命令添加到 本机的环境变量里，如npm install vue-cli -g, 就会将vue 命令添加到本机的环境变量，则所有地方都能使用，要安装到全局的主要是一些工具，如vue-cli脚手架创建工具
+ 项目安装 npm install：安装到当前项目的node_modules，只有当前项目文件下才能使用

## npm install 安装流程