/* 
  Gulp的异步任务
*/
const fs = require('fs')

// 通过回调结束异步任务
exports.callback = done => {
  console.log('callback task')
  done()
}
// 错误优先
exports.callback_error = done => {
  console.log('callback task')
  done(new Error('task failed'))
}
// 通过promise来结束任务
exports.promise = () => {
  console.log('promise task')
  return Promise.resolve()
}

exports.promise_error = () => {
  console.log('promise task')
  return Promise.reject(new Error('task failed'))
}

const timeout = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

exports.async = async () => {
  await timeout(1000)
  console.log('async task')
}

// 利用文件流中的end()事件来结束
exports.stream = () => {
  const read = fs.createReadStream('yarn.lock')
  const write = fs.createWriteStream('a.txt')
  read.pipe(write)
  return read
}

// exports.stream = done => {
//   const read = fs.createReadStream('yarn.lock')
//   const write = fs.createWriteStream('a.txt')
//   read.pipe(write)
//   read.on('end', () => {
//     done()
//   })
// }
