const { log } = require('console')
const fs = require('fs')
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
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`)

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message)

      fs.writeFile('dog-image.txt', res.body.message, (err) => {
        if (err) return console.log(err.message)
        console.log('Random dog image saved to the file!')
      })
    })
    .catch((err) => {
      console.log(err.message)
    })
})
