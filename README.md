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