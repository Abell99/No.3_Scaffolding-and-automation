/* 
  Gulp的组合任务
*/
// 串行与并行
const { series, parallel } = require('gulp')

const task1 = done => {
  setTimeout(() => {
    console.log('task1 working~')
    done()
  }, 1000)
}

const task2 = done => {
  setTimeout(() => {
    console.log('task2 working~')
    done()
  }, 1000)  
}

const task3 = done => {
  setTimeout(() => {
    console.log('task3 working~')
    done()
  }, 1000)  
}

// 让多个任务按照顺序依次执行
exports.foo = series(task1, task2, task3)
/* 
  输出结果:
    [02:10:09] Starting 'foo'...
    [02:10:09] Starting 'task1'...
    [02:10:10] Finished 'task1' after 1.04 s
    [02:10:10] Starting 'task2'...
    task2 working~
    [02:10:11] Finished 'task2' after 1.01 s
    [02:10:11] Starting 'task3'...
    task3 working~
    [02:10:12] Finished 'task3' after 1 s
    [02:10:12] Finished 'foo' after 3.09 s
    Done in 5.10s.
*/

// 让多个任务同时执行
exports.bar = parallel(task1, task2, task3)
/* 
  输出结果:
    [02:10:25] Starting 'bar'...
    [02:10:25] Starting 'task1'...
    [02:10:25] Starting 'task2'...
    [02:10:25] Starting 'task3'...
    task1 working~
    [02:10:26] Finished 'task1' after 1.01 s
    task2 working~
    [02:10:26] Finished 'task2' after 1.02 s
    task3 working~
    [02:10:26] Finished 'task3' after 1.03 s
    [02:10:26] Finished 'bar' after 1.04 s
    Done in 2.23s.
*/
