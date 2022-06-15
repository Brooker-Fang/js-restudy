## 好的博客
https://dev.to/shree_j/how-npm-works-internally-4012
https://cloud.tencent.com/developer/article/1555982
## npm install 命令
+ 全局安装 npm install -g : 安装到本机的node指定的全局包文件里，并且将库的可执行命令添加到 本机的环境变量里，如npm install vue-cli -g, 就会将vue 命令添加到本机的环境变量，则所有地方都能使用，要安装到全局的主要是一些工具，如vue-cli脚手架创建工具
+ 项目安装 npm install：安装到当前项目的node_modules，只有当前项目文件下才能使用
## package-lock.json属性
+ version：当前安装在 node_modules中的版本
+ resolved: 库 具体的下载地址
+ integrity: 库 的hash值，来验证已安装的软件包是否改动、是否失效
+ requires: 对应子依赖的依赖，与子依赖的 package.json 中 dependencies的依赖项相同
+ Dev：表示该模块是否为顶级模块的开发依赖或者是一个的传递依赖关系
+ requires：依赖包所需要的所有依赖项，对应依赖包 package.json 里 dependencies 中的依赖项
+ dependencies：依赖包 node_modules 中依赖的包（特殊情况下才存在）
  + 并不是所有的子依赖都有 dependencies 属性，只有子依赖的依赖和当前已安装在根目录的 node_modules 中的依赖冲突之后，才会有这个属性

## 可以通过 npm i --timing=true --loglevel=verbose 或者 npm install package --timing=true --loglevel=verbose 命令看到 npm install 的完整过程
## npm install 安装流程
![avatar](./npm.png)
+ 检查.npmrc文件：优先级为 项目的.npmrc => 用户级的.npmrc => 全局的.npmrc => npm内置的.npmrc
+ 检查项目中有无lock文件
+ 没有lock文件：
  + 从 npm 远程仓库获取库信息
  + 根据dependencies和devDependencies构建依赖关系，如安装axios，里面又依赖了follow-redirects库，
  + 查看缓存目录，
    + 如果有缓存则直接解压到前项目的node_modules 完成安装，并生成lock文件
    + 如果没有缓存，则从npm registry仓库下载压缩包到本机的npm 缓存目录下的_cacache/content-v2/（可以通过 npm get cache 查看缓存路径）
      + 将压缩包解压到当前项目的node_modules 完成安装，并生成lock文件
+ 有lock文件
  + 检查 package.json 中的依赖版本是否和 package-lock.json 中的依赖有冲突，
    + 如果有冲突则重新构建依赖关系，并且install执行后重新生成package-lock.json
    + 如果不冲突则根据lock中对应的库的integrity 属性 到 cache目录下的_cacache/index-v5 找到对应的库信息（保存着缓存库在本机的文件路径），找到对应库的压缩包 解压到 node_modules文件下
    + 如果没有缓存 则去下载到缓存目录再解压


## 缓存 
在执行 npm install 或 npm update命令下载依赖后，除了将依赖包安装在node_modules 目录下外，还会在本机设置的npm的缓存目录缓存一份。

可以通过 npm get cache 获取路径地址

在这个目录下又存在两个目录：content-v2、index-v5，content-v2 目录用于存储 tar包的缓存，而index-v5目录用于存储tar包的 hash。

npm 在执行安装时，可以根据 package-lock.json 中存储的 integrity、version、name 生成一个唯一的 key 对应到 index-v5 目录下的缓存记录，从而找到 tar包的 hash，然后根据 hash 再去找缓存的 tar包直接使用。
## 其他常用命令
+ 去除重复依赖的库。
  + npm dedupe
  + 出现的case：如 A 依赖 C@1.0.0，B依赖 C@2.0.0，并且A先于B安装
+ 获取/设置npm源仓库地址
  + npm config get registry
  + npm config set registry [address]
  + npm install [package] -D --registry=[address]
+ 获取npm缓存的仓库地址
  + npm get cache
+ 卸载依赖
  + npm uninstall package
  + npm uninstall package --save-dev
  + npm uninstall package -D 
+ 强制重新安装
  + npm rebuild
+ 清除缓存
  + npm cache clean
+ 命令文档地址：https://docs.npmjs.com/cli/v8/commands

## 历史版本变化
### npm 2.x版本
+ npm2在安装依赖包，采用的是简单的递归安装方法。每一个包都有自己的依赖包，每一个包的依赖都安装在自己的node_modules中，依赖关系层层递进，构成整个依赖树，这个依赖树与文件系统中的文件结构树一一对应。
+ 优点在于 层级结构明显
+ 缺点在于 
  + 如果依赖层级过多，目录会嵌套很多层，导致node—_modules目录会非常庞大，并且可能超过window 系统中 文件路径的最长字符，出现不可预知问题。
  + 而且相同的依赖并没有进行复用，导致许多相同依赖冗余
### npm 3.x版本
3.x将嵌套结构改为扁平结构，即无论直接依赖 还是 依赖的子依赖 都放在node_modules的根目录下。
优点：解决了上面部分问题
缺点：
  + package.json只会锁定 依赖的大版本，（即x.y.z, x保持不变，xy可能发送变化）在某些依赖包小版本更新后，可能造成依赖结构的改动，依赖结构的不确定性可能会给程序带来不可预知的问题
  + 当出现版本依赖冲突时，执行npm install具有不确定性，即模块的安装顺序可能影响 node_modules 内的文件结构

### npm 5.x版本
为了解决 npm install 的不确定性问题，在 npm 5.x 版本新增了 package-lock.json 文件，而安装方式还沿用了 npm 3.x 的扁平化的方式。

package-lock.json 的作用是锁定依赖结构，即只要你目录下有 package-lock.json 文件，那么你每次执行 npm install 后生成的 node_modules 目录结构一定是完全相同的。

#### 对于 lockfiles 的处理，5.x不同版本处理也不同。
使用 package-lock.json 是 npm v5.x 版本新增特性，而 npm v5.6 以上才逐步稳定，在 5.0 - 5.6 中间，对 package-lock.json 的处理逻辑进行过几次更新。
+ 在 npm v5.0.x 版本中，npm install 时都会根据 package-lock.json 文件下载，不管 package.json 内容究竟是什么。
+ npm v5.1.0 版本到 npm v5.4.2，npm install 会无视 package-lock.json 文件，会去下载最新的 npm 包并且更新 package-lock.json。
+ npm 5.4.2 版本后：
  + 如果项目中只有 package.json 文件，npm install 之后，会根据它生成一个 package-lock.json 文件；
  + 如果项目中存在 package.json 和 package-lock.json 文件，同时 package.json 的 semver-range 版本 和 package-lock.json 中版本兼容，即使此时有新的适用版本，npm install 还是会根据 package-lock.json 下载；
  + 如果项目中存在 package.json 和 package-lock.json 文件，同时 package.json 的 semver-range 版本和 package-lock.json 中版本不兼容，npm install 时 package-lock.json 将会更新到兼容 package.json 的版本；
  + 如果 package-lock.json 和 npm-shrinkwrap.json 同时存在于项目根目录，package-lock.json 将会被忽略。

### Npm是怎么解决解决版本冲突
版本冲突是多个包依赖了同一个包，但是依赖的版本不同。如A依赖着C@1.0.0，B依赖着C@2.0.0。
npm会将先下载的子依赖先放到node_modules目录下，后下载的子依赖放在父依赖的node_modules，如 安装顺序是A B , 即执行命令
```js
npm install A 
npm install B
```
则node_modules的目录结构如下:
```js
node_modules
  - A
  - B
    - node_modules
       - C@2.0.0
  - C@1.0.0
```

安装顺序是 B A, 则node_modules的目录结构如下：
```js
node_modules
  - A
    - node_modules
      - C@1.0.0
  - B
  - C@2.0.0
```
## npm 多源镜像和企业级部署私服原理
可以通过npm config set命令来设置安装源或者某个 scope 对应的安装源。
而企业如果部署了企业自己的npm库，可以通过 npm-preinstall 的钩子，通过 npm 脚本，在安装公共依赖前自动进行源切换：
```js
"scripts": {
  "preinstall": "node ./bin/preinstall.js"
}
```
其中 preinstall.js 脚本内容，具体逻辑为通过 node.js 执行npm config set命令，代码如下：
```js
require(' child_process').exec('npm config get registry', function(error, stdout, stderr) {
  if (!stdout.toString().match(/registry\.x\.com/)) {
    exec('npm config set @xscope:registry https://xxx.com/npm/')
  }
})
```
## 为什么企业要部署自己的私服
虽然 npm 并没有被屏蔽，但是下载第三方依赖包的速度依然较缓慢，这严重影响 CI/CD 流程或本地开发效率。部署镜像后，一般可以确保高速、稳定的 npm 服务，而且使发布私有模块更加安全。除此之外，审核机制也可以保障私服上的 npm 模块质量和安全。
## 如何部署企业私服，工作原理？（TODO）
主要有 3 种工具来搭建 npm 私服：nexus、verdaccio 以及 cnpm
### Npm是怎么解决循环依赖
扁平化结构就可以解决循环依赖

## npm ci 
npm ci 就是专门为 CI 环境准备的安装命令，相比 npm install 它的不同之处在于：
+ npm ci 要求项目中必须存在 package-lock.json 或 npm-shrinkwrap.json；
+ npm ci 完全根据 package-lock.json 安装依赖，这可以保证整个开发团队都使用版本完全一致的依赖；
  + 正因为 npm ci 完全根据 package-lock.json 安装依赖，在安装过程中，它不需要计算求解依赖满足问题、构造依赖树，因此安装过程会更加迅速；
+ npm ci 在执行安装时，会先删除项目中现有的 node_modules，然后全新安装；
+ npm ci 只能一次安装整个项目所有依赖包，无法安装单个依赖包；
+ 如果 package-lock.json 和 package.json 冲突，那么 npm ci 会直接报错，并非更新 lockfiles；
+ npm ci 永远不会改变 package.json 和 package-lock.json。
基于以上特性，我们在 CI 环境使用 npm ci 代替 npm install，一般会获得更加稳定、一致和迅速的安装体验。
## npm-shrinkwrap.json 和 package-lock.json区别
早期 npm 锁定版本的方式是使用 npm-shrinkwrap.json，它与 package-lock.json 不同点在于：npm 包发布的时候默认将 npm-shrinkwrap.json 发布，因此类库或者组件需要慎重。
https://www.jianshu.com/p/5ef0aabbf5ee

## .npmrc配置文件
## npm run start 和 npm start
npm start和 npm run start是等效关系。
一些比较常用的命令可以省略run，类似的还有npm stop、npm test等等，而其他的一些不太通用的命令项则只能通过npm run <命令项>的形式执行

## pnpm
https://juejin.cn/post/6932046455733485575#heading-5