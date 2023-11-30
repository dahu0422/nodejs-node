const { rejects } = require('assert')
const { log } = require('console')
const fs = require('fs')
const { resolve } = require('path')
const superagent = require('superagent')

// 嵌套回调 === 回调地狱
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`)

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(err.message)
//       console.log(res.body.message)

//       fs.writeFile('dog-image.txt', res.body.message, (err) => {
//         if (err) return console.log(err.message)
//         console.log('Random dog image saved to the file!')
//       })
//     })
// })

// Promise
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject('I could not find that file 😢')
      } else {
        resolve(data)
      }
    })
  })
}

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) {
        reject('Could not write file 😢')
      } else {
        resolve('success')
      }
    })
  })
}

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`)
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
  })
  .then((res) => {
    console.log(res.body.message)
    return writeFilePro('dog-image.txt', res.body.message)
  })
  .then(() => {
    console.log('Random dog image saved to the file!')
  })
  .catch((err) => {
    console.log(err)
  })

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`)

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message)

//       fs.writeFile('dog-image.txt', res.body.message, (err) => {
//         if (err) return console.log(err.message)
//         console.log('Random dog image saved to the file!')
//       })
//     })
//     .catch((err) => {
//       console.log(err.message)
//     })
// })
