## npm install 命令
+ 全局安装 npm install -g : 安装到本机的node指定的全局包文件里，并且将库的可执行命令添加到 本机的环境变量里，如npm install vue-cli -g, 就会将vue 命令添加到本机的环境变量，则所有地方都能使用，要安装到全局的主要是一些工具，如vue-cli脚手架创建工具
+ 项目安装 npm install：安装到当前项目的node_modules，只有当前项目文件下才能使用

## npm install 安装流程
![avatar](./npm.png)


## 其他常用命令

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