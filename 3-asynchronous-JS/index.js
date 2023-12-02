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

// Promise 1.1
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

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`)
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//   })
//   .then((res) => {
//     console.log(res.body.message)
//     return writeFilePro('dog-image.txt', res.body.message)
//   })
//   .then(() => {
//     console.log('Random dog image saved to the file!')
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// Async / Await
// const getDogPic = async () => {
//   try {
//     const data = await readFilePro(`${__dirname}/dog.txt`)
//     console.log(`Bread:${data}`)

//     const res = await superagent.get(
//       `https://dog.ceo/api/breed/${data}/images/random`
//     )
//     console.log(res.body.message)

//     await writeFilePro('dog-img.txt', res.body.message)
//     console.log('Random dog image saved to file!')
//   } catch (err) {
//     throw err
//   }
//   return '2: READY DOG'
// }

// const x = getDogPic()
// 打印x 返回 Promise <pending >；async自动返回一个promise

// 获取返回值 Solution1:promise方式
// console.log('1:Will get dog pics!')
// getDogPic().then((res) => {
//   const x = res
//   console.log(x)
//   console.log('3:Done getting dog pics!')
// })

// 获取返回值 Solution2:自执行函数
// ;(async () => {
//   try {
//     console.log('1:Will get dog pics!')
//     const x = await getDogPic()
//     console.log(x)
//     console.log('3:Done getting dog pics!')
//   } catch (err) {
//     console.log(err)
//   }
// })()

// Promise.all
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`)
    console.log(`Bread:${data}`)

    const res1 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    )
    const res2 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    )
    const res3 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    )

    const all = await Promise.all([res1, res2, res3])
    const imgs = all.map((x) => x.body.message)
    console.log(imgs)

    await writeFilePro('dog-img.txt', imgs.join('\n'))
    console.log('Random dog image saved to file!')
  } catch (err) {
    throw err
  }
  return '2: READY DOG'
}

// 获取返回值 Solution2:自执行函数
getDogPic()
