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
## 可以通过 npm i --timing=true --loglevel=verbose 或者 npm install package --timing=true --loglevel=verbose 命令看到 npm install 的完整过程
## npm install 安装流程
![avatar](./npm.png)
+ 检查.npmrc文件：优先级为 项目的.npmrc => 用户级的.npmrc => 全局的.npmrc => npm内置的.npmrc
+ 检查项目中有无lock文件
+ 没有lock文件：
  + 从 npm 远程仓库获取库信息
  + 根据dependencies和devDependencies构建依赖关系，如安装axios，里面又依赖了follow-redirects库，
  + 然后从npm registry仓库下载压缩包到本机的npm 缓存目录下的_cacache/content-v2/（可以通过 npm get cache 查看缓存路径）
  + 将压缩包解压到当前项目的node_modules 完成安装，并生成lock文件
+ 有lock文件
  + 检查 package.json 中的依赖版本是否和 package-lock.json 中的依赖有冲突，如果不一致则重新构建依赖关系，如果一致则根据lock中对应的库的integrity 属性 到 cache目录下的_cacache/index-v5 找到对应的库信息（保存着缓存库在本机的文件路径），找到对应库的压缩包 解压到 node_modules文件下


## 缓存 
在执行 npm install 或 npm update命令下载依赖后，除了将依赖包安装在node_modules 目录下外，还会在本机设置的npm的缓存目录缓存一份。

可以通过 npm get cache 获取路径地址

在这个目录下又存在两个目录：content-v2、index-v5，content-v2 目录用于存储 tar包的缓存，而index-v5目录用于存储tar包的 hash。

npm 在执行安装时，可以根据 package-lock.json 中存储的 integrity、version、name 生成一个唯一的 key 对应到 index-v5 目录下的缓存记录，从而找到 tar包的 hash，然后根据 hash 再去找缓存的 tar包直接使用。
## 其他常用命令
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
  + 当出现版本依赖冲突时，执行npm install具有不确定性

### npm 5.x版本
为了解决 npm install 的不确定性问题，在 npm 5.x 版本新增了 package-lock.json 文件，而安装方式还沿用了 npm 3.x 的扁平化的方式。

package-lock.json 的作用是锁定依赖结构，即只要你目录下有 package-lock.json 文件，那么你每次执行 npm install 后生成的 node_modules 目录结构一定是完全相同的。


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

### Npm是怎么解决循环依赖
扁平化结构就可以解决循环依赖

## pnpm
https://juejin.cn/post/6932046455733485575#heading-5