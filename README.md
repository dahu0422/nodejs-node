# nodejs-node
学习Nodejs记录

## P8 同步阻塞代码，异步不阻塞代码

## P9 异步读写文件
`readFile()` 和 `writeFile()`具体参数看文档

## P10 创建简单的web服务
- `http.createServer()`：创建一个web服务；  
- `res.end()`：服务器向请求方发送消息；  
- `server.linten()`：启动监听连接的服务器，接收端口、地址、回调函数。

## P11 route路由
通过req.url获取当前用户访问路由页面，展示不同页面信息。  
`req.url`：获取当前用户访问路由页面。  
`res.writeHead`：接收三个参数，状态码、可读的状态消息、`header`响应头。必须在`res.end`之前调用。

## P12 一个简单的API

## P13-14 农场DEMO
1. 读取文件template文件夹下`.html`文件，以字符串形式返回；
2. 遍历循环`data.json`中数据，通过字符串替换形式将替换`tempCard`的占位符。
3. 将`templateOver`文件下占位符用`tempCard`替换。
4. `res.end()`，启动服务，看效果。

## P15 从URL中读取参数
引入`url`模块，版本原因，原视频中`url.parse`方法在我当前的v16.16版本已经废除，使用新语法`new URL`，可以不用引入`url`模块。  

在使用过程中获取`req.protocol`是意外发现是undefined，目前还未找出原因。初步猜测是因为本地服务。文档中表明：
> 分配给 protocol 属性的无效的网址协议值将被忽略.

最后继续使用字符串替换的方法，将找到的`data[id]`替换`templateProduct`中的占位符。

## P16 使用module.exports
将`replaceTemplate()`封装成公用方法，通过modules.exports导出。

## P17 介绍 npm

## P18 dependencies 和 devDependencies
项目依赖和开发依赖的区别，默认安装是项目依赖，--save-dev安装开发依赖。  

如何使用项目中安装的开发依赖，例如nodemon。

## P19 如何引入、使用第三方包

## P20 依赖包版本和更新
`npm outdated`：检查当前项目包版本是否落后；

`package.json`：项目清单。官方介绍：
> https://dev.nodejs.cn/learn/the-package-json-guide/

软件包版本：所有版本都有3个数字，第一个是主版本，第二个是次版本，第三个是补丁版本。
- `~3.1.0`：表示安装`3.1.x`最新版本，单不更新主版本号、次版本号。
- `^3.1.0`：表示安装`3.x.x`最新版本，但不更新主版本号。
- `*3.1.0`：表示安装最新版本，更新主版本号。

`package.json`：跟踪被安装的每个软件包的确切版本，以便产品可以以完全相同的方式被复制。

## P21 VScode配置
prettier 格式化文档
 
 ---

 ## P24 浏览器是如何工作的
<img src="./浏览器工作概览.png">

## P25 HTTP请求

## P27 静态页面 动态页面
通过`API`请求

## P29 Node、chrome V8、Libuv、C++
`Node.js`是基于`chreom V8`和`Libuv`进行封装的一层。

## P30线程、线程池
`Node.js`单线程。程序初始化时顶层代码会执行，注册必须的模块，然后事件循环开始运行。有些时间太耗时，将会被放入线程池中(图中举例哪种任务是繁重的)。
<img src="./nodejs进程、线程池.png">

## P31～32 Event Loop
`process.env.UV_THREADPOOL_SIZE`设置线程池数量，通常默认是4个。

## P33 事件和事件驱动架构
`Node.js`核心API都是围绕异步事件驱动架构构建的，在该架构中，某些类型的对象（“触发器”）触发命名事件。  
所有触发事件的对象都是`EventEmitter`类的实例。这些对象暴露了`eventEmitter.on()`函数，允许将一个或多个函数绑定到对象触发的命名事件。