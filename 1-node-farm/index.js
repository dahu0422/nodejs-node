const fs = require('fs');
const http = require('http')
// const url = require('node:url')

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
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
let dataObj = JSON.parse(data)

// 把templateCard中占位符全部替换并返回替换后的结果
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  return output
}


// 创建一个服务
const server = http.createServer((req, res) => {
  // const {pathname, query } = url.parse(req.url) // 已废弃，使用new URL

  // TODO: 因为是本地的服务所以 req.protocol 是 undefined么？
  const baseURL = req.protocol + '://' + req.headers.host + '/';
  const url = new URL(req.url, baseURL)
  const pathname = url.pathname
  const id = url.searchParams.get('id')

  // Overview Page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-Type': 'text/html' })

    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
    res.end(output)

    //  Produce Page
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    const product = dataObj[id]
    const output = replaceTemplate(tempProduct, product)
    res.end(output)

    // Api Page
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(data)

    //  404
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