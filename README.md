## Introduction
- Babel是一个广泛使用的转码器，可以将ES6代码转为ES5代码，从而在现有环境执行
- [阮一峰Babel教程](http://www.ruanyifeng.com/blog/2016/01/babel.html)

## 配置文件.babelrc
- Babel的配置文件是.babelrc，存放在项目的根目录下。使用Babel的第一步，就是配置这个文件。
该文件用来设置转码规则和插件，基本格式：  
  ```
  {
    "presets": [
      "es2015",
      "react"
    ],
    "plugins": []
  }
  ```
- 转码规则:
  ```
  <!-- ES2015转码规则 -->
  npm install --save-dev babel-preset-es2015
  <!-- react转码规则 -->
  npm install --save-dev babel-preset-react
  ```

## 命令行转码babel-cli
- Babel提供babel-cli工具，用于命令行转码  
  `npm install --global babel-cli`
- 基本用法
  ```
  <!-- 转码结果输出到标准输出 -->
  babel example.js

  <!-- 转码结果写入一个文件 -->
  <!-- --out-file 或 -o 参数指定输出文件 -->
  babel example.js --out-file compiled.js
  <!-- 或者 -->
  babel example.js -o compiled.js

  <!-- 整个目录转码 -->
  <!-- --out-dir 或 -d 参数指定输出目录 -->
  babel src --out-dir lib
  <!-- 或者 -->
  babel src -d lib

  <!-- -s 参数生成source map文件 -->
  babel src -d lib -s  
  ```
- 上面代码是在全局环境下，进行Babel转码。这意味着，如果项目要运行，全局环境必须有Babel，也就是说项目产生了对环境的依赖。另一方面，这样做也无法支持不同项目使用不同版本的Babel
- 一个解决办法是将babel-cli安装在项目之中  
  `npm install --save-dev babel-cli`  
  然后，改写package.json
  ```
  {
    // ...
    "devDependencies": {
      "babel-cli": "^6.0.0"
    },
    "scripts": {
      "build": "babel src -d lib"
    },
  }
  ```  
  转码的时候，就执行下面的命令:  
  `npm run build`

## babel-node
- babel-cli工具自带一个babel-node命令，提供一个支持ES6的REPL环境。它支持Node的REPL环境的所有功能，而且可以直接运行ES6代码
- 它不用单独安装，而是随babel-cli一起安装。然后，执行babel-node就进入PEPL环境
- babel-node命令可以直接运行ES6脚本。将上面的代码放入脚本文件es6.js，然后直接运行
  `babel-node .\src\example.js`

## babel-register
- babel-register模块改写require命令，为它加上一个钩子。此后，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用Babel进行转码

## babel-core
- 如果某些代码需要调用Babel的API进行转码，就要使用babel-core模块

## babel-polyfill
- Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码
- 举例来说，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片
  1. `npm install --save babel-polyfill`
  2. 在脚本头部加入如下代码
    ```
    import 'babel-polyfill';
    // 或者
    require('babel-polyfill');
    ```

## 浏览器环境（只用于开发阶段）
- Babel也可以用于浏览器环境。但是，从Babel 6.0开始，不再直接提供浏览器版本，而是要用构建工具构建出来。如果你没有或不想使用构建工具，可以通过安装5.x版本的babel-core模块获取  
  `npm install babel-core@5`  
  ```
  <script src="node_modules/babel-core/browser.js"></script>
  <script type="text/babel">
  // Your ES6 code
  </script>
  ```
- 另一种方法是使用babel-standalone模块提供的浏览器版本，将其插入网页
  ```
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.4.4/babel.min.js"></script>
  <script type="text/babel">
  // Your ES6 code
  </script>
  ```
