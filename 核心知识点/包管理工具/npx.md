# npx
在npm5.x版本之后，安装npm时会自动安装npx

## 主要作用
常用于调用当前项目中某个模块的命令，如npx webpack，调用的是当前项目中node_modules中的webpack命令，而单纯的执行webpack，是会到环境变量找webpack命令，即全局的webpack。即 npx webpack --version === ./node_modules/bin/webpack --version