// console.log(arguments);
console.log(require('module').wrapper)

// module.exports 导出一个变量：class类或者对象...
const C = require('./test-module-1')
const calc1 = new C()
console.log(calc1.add(2, 5))

// exports 可以导出多个对象
// const calc2 = require("./test-module-2");
const { add, multiply } = require('./test-module-2')
console.log(multiply(2, 5))

// caching 从缓存中读取已加载的数据
require('./test-module-3')()
require('./test-module-3')()
require('./test-module-3')()
