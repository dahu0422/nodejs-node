const fs = require('fs');
const http = require('http')

// ----------------- 文件API -----------------
// 阻塞、同步方式
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\n Created on ${Date.now()}`
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!')

// 不阻塞、异步方式
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) { console.log('文件不存在') }

//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2)

//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       console.log(data3);

//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//         console.log('文件已写完')
//       })
//     })
//   })
// })

// ----------------- 服务API -----------------
// 创建一个服务
const server = http.createServer((req, res) => {
  const pathName = req.url;
  console.log(pathName);
  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the OVERVIEW')
  } else if (pathName === '/product') {
    res.end('This is the PRODUCT')
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    });
    res.end('<h1>Page not found!</h1>')
  }
})

// 监听来自127.0.0.1本机，端口为8000的请求
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
})