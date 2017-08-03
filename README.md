# React实战(一)WEBPACK
@(REACT-JS)[react]

[TOC]
### 项目练习github地址
git@github.com:engjose/webpack.git
https://github.com/engjose/webpack.git
#### webpack是什么
简单来说webpack是一个打包工具,可以将许多的js文件或者其他文件打包成一个文件
![enter image description here](http://oayt7zau6.bkt.clouddn.com/webpack%E8%A7%A3%E9%87%8A.png)

#### 为什么要打包
1.模块化
2.压缩代码,提升加载速度
3.使用新的开发模式
#### Webpack的特点
1.同时支持CommonJs和AMD
2.一切都可以打包
3.分模块打包
#### 初始化项目
- <font color='blue'>***创建空的文件目录***</font>

```json
shizhengyangdeMacBook-Pro% mkdir webpack-01
shizhengyangdeMacBook-Pro% cd webpack-01
```
- <font color='blue'>***初始化项目***</font>

```sql
-- 输入以下命令,然后一路回车
shizhengyangdeMacBook-Pro% npm init

-- 初始化完成之后会看到多了package.json文件
```
- <font color='blue'>***安装webpack***</font>

1.进入到webpack的官网,点击document=>usage查看文档,发现我们需要创建一个webpack.config.js文件 https://webpack.js.org/concepts/
```sql
-- 创建webpack.config.js文件在项目跟目录中
shizhengyangdeMacBook-Pro% vim webpack.config.js

-- 里面的内容,从官网复制,简单的修改(先创建一个简单的文件)
module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};

-- 修改后的文件
module.exports = {
  entry: './index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  }
};
```
entry: './index.js' 表示入口文件
output:表示打包后文件的输出路径和文件名称

2.全局安装webpack
```sql
sudo npm install -g webpack
```
3.全局安装服务
```sql
sudo npm install -g webpack-dev-server
```
4.在项目中安装webpack
```sql
sudo npm install webpack --save
```
5.在项目中安装webpack服务
```sql
sudo npm install webpack-dev-server --save
```
6.安装完成之后就会多一个包的管理文件夹node_modules
- <font color='blue'>***生成打包文件***</font>

webpack安装好之在项目的根目录下开始打包js文件,输入:
```sql
shizhengyangdeMacBook-Pro% webpack
-- 观察项目中多了一个bundle.js文件
```
- <font color='blue'>***运行项目***</font>

1.因为我们的入口文件是index.js文件,所以在index.js文件中写入:
```javascript
document.write('Hello World');
```
2.创建一个index.html引入bundle.js
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <script src="bundle.js"></script>
</body>
</html>
```
3.运行服务进行打包
```sql
-- 输入以下命令
shizhengyangdeMacBook-Pro% webpack-dev-server
Project is running at http://localhost:8080/

-- 此时我们访问http://localhost:8080/,发现出现Hello World, 
```
### 项目实战---模拟一个网站有前后台
- <font color='blue'>***创建项目***</font>

```sql
-- 创建一个购物项目
shizhengyangdeMacBook-Pro% mkdir webpack-shopping
shizhengyangdeMacBook-Pro% cd webpack-shopping

-- 创建后台项目
shizhengyangdeMacBook-Pro% mkdir admin
shizhengyangdeMacBook-Pro% cd admin
shizhengyangdeMacBook-Pro% vim index.html
shizhengyangdeMacBook-Pro% vim index.js

-- 创建前台项目
shizhengyangdeMacBook-Pro% mkdir consumer
shizhengyangdeMacBook-Pro% cd consumer
shizhengyangdeMacBook-Pro% vim index.html
shizhengyangdeMacBook-Pro% vim index.js

-- 此时目录结构
shizhengyangdeMacBook-Pro% pwd
/Users/panyuanyuan/java/test_code/fore-end/react/webpack/webpack-shopping
shizhengyangdeMacBook-Pro% ls
admin		consumer
```
- <font color='blue'>***项目初始化***</font>

1.在shopping目录下初始化项目,npm init 一路回车
```sql
shizhengyangdeMacBook-Pro% npm init
```
2.在shopping目录下安装weboack
```sql
shizhengyangdeMacBook-Pro% npm install webpack --save
shizhengyangdeMacBook-Pro% npm install webpack-dev-server --save
```
3.内容编写:两个项目中的index.html和index.js编写
admin---html
```vbscript-html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>admin</title>
</head>
<body>
    <h1>Admin Page</h1>
    <p id="content"></p>
</body>
<script src="/dist/admin.bundle.js" ></script>
</html>
```
admin---js
```javascript
document.getElementById('content').innerText = 'this is admin page';
```
consumer---html
```vbscript-html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>consumer</title>
</head>
<body>
    <h1>Consumer Page</h1>
    <p id="content"></p>
</body>
<script src="/dist/consumer.bundle.js" ></script>
</html>
```
consumer---js
```javascript
document.getElementById('content').innerText = 'this is Consumer Page';
```
- <font color='blue'>***webpack配置***</font>

1.在shopping根目录下创建webpack.config.js
```javascript
var path = require('path');
module.exports = {
    entry: {
        admin: './admin/index.js',
        consumer: './consumer/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: '[name].bundle.js'
    }
};
```
2.解释
```javascript
-- 引入path目录,是node自带的
var path = require('path');

-- webpack采用了commen.js的标准,以module的形式将json导出
module.exports = {}

-- 表示文件的入口,这里有两个项目,所以有两个入口
entry : ...

-- 配置文件目录和文件的名字
output: {}

-- 表示将产生的js文件在当前目录下的dist文件夹中
path: path.join(__dirname, 'dist'),

-- 表示打包好的文件从dist文件夹中获取
publicPath: '/dist/',
```
3.输入webpack可以看到文件打包成功
```sql
shizhengyangdeMacBook-Pro% webpack
```
4.引入相应的*.bundle.js文件,并且开启webpack服务
```sql
shizhengyangdeMacBook-Pro% webpack-dev-server
```
我们也可以在package.json中的script中配置以下的配置:
```json
  "scripts": {
    "start": "webpack-dev-server --progress --color"
  },
```
这时候我们启动就可以采用以下的方式启动:
```sql
shizhengyangdeMacBook-Pro% npm start
```
我们也可以配置webpack热部署
```sql
  "scripts": {
    "start": "webpack-dev-server --progress --color --hot --inline"
  },
```
5.测试效果,我们打开项目输入地址:http://localhost:8080/admin/ 或者http://localhost:8080/consumer/就会看到相应的结果
- <font color='blue'>***webpack插件webpackPlugin***</font>

我们看到webpack帮助我们打包后文件中有一些注释和空格,这样的文件会很大.这时候我们就可以用UglifyjsWebpackPlugin插件

我们在webpack.config.js中添加以下的配置:
```json
var path = require('path');
var webpack = require('webpack'); -- 新加
module.exports = {
    entry: {
        admin: './admin/index.js',
        consumer: './consumer/index.js'
    },
----------新加-----------
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ],
------------------------
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: '[name].bundle.js'
    }
};
```
从新打包文件:
```json
输入webpack 我们发现文件被压缩了
```
