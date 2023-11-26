const fs = require('fs')
const crypto = require('crypto')

const start = Date.now()
process.env.UV_THREADPOOL_SIZE = 4

// 此时 setTimeout、setImmediate、readFile不在一个I/O中执行，所以打印顺序是不一定的。
// setTimeout(() => console.log('Timer 1 finished'), 2000)
// setImmediate(() => console.log('Immediate 1 finished'))

// fs.readFile('test-file.txt', () => {
//   console.log('I/O finished')
// })

// console.log('Hello from the top-level code')

// ---------------------- 分割线 ----------------------

// setTimeout(() => console.log('Timer 1 finished'), 2000)
// setImmediate(() => console.log('Immediate 1 finished'))

// fs.readFile('test-file.txt', () => {
//   console.log('I/O finished')
//   console.log('-----')

//   // 在同一个I/O下面，打印按照eventloop执行
//   setTimeout(() => console.log('Timer 2 finished'), 0)
//   setTimeout(() => console.log('Timer 3 finished'), 3000)
//   setImmediate(() => console.log('Immediate 2 finished'))

//   process.nextTick(() => console.log('Process.nextTick')) // 微任务
// })

// console.log('Hello from the top-level code')

// ---------------------- 分割线 ----------------------

setTimeout(() => console.log('Timer 1 finished'), 2000)
setImmediate(() => console.log('Immediate 1 finished'))

fs.readFile('test-file.txt', () => {
  console.log('I/O finished')
  console.log('-----')

  // 在同一个I/O下面，打印按照eventloop执行
  setTimeout(() => console.log('Timer 2 finished'), 0)
  setTimeout(() => console.log('Timer 3 finished'), 3000)
  setImmediate(() => console.log('Immediate 2 finished'))

  process.nextTick(() => console.log('Process.nextTick')) // 微任务

  // 同步执行会阻塞代码执行
  // crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512')
  // console.log(Date.now() - start, 'Password encrypted')

  // crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512')
  // console.log(Date.now() - start, 'Password encrypted')

  // crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512')
  // console.log(Date.now() - start, 'Password encrypted')

  // crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512')
  // console.log(Date.now() - start, 'Password encrypted')

  // 因为有4个线程池，所以打印时间基本相同。
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted')
  })
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted')
  })
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted')
  })
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted')
  })
})

console.log('Hello from the top-level code')
