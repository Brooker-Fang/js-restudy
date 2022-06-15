# npx
在npm5.x版本之后，安装npm时会自动安装npx

## 主要作用
常用于调用当前项目中某个模块的命令，如npx webpack，调用的是当前项目中node_modules中的webpack命令，而单纯的执行webpack，是会到环境变量找webpack命令，即全局的webpack。即 npx webpack --version === ./node_modules/bin/webpack --version。
在运行命令时，npx 可以自动去 node_modules/.bin 路径和环境变量 $PATH 里面检查命令是否存在，而不需要再在 package.json 中定义相关的 script。

npx 另一个更实用的好处是：npx 执行模块时会优先安装依赖，但是在安装执行后便删除此依赖，这就避免了全局安装模块带来的问题。如 npx create-react-app [name]