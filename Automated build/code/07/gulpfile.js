/* 
    gulp的基本使用
*/

// gulp的入口文件
/* 最新规定必须都为异步任务,最后需要手动表示任务的结束,不然会报错
exports.foo = () => {
    console.log('foo task working~')
} */

// 最新的标准:
exports.foo = done => {
    console.log('foo task working~')

    done() // 表示任务已完成
}

// default,默认任务
exports.default = done => {
    console.log('default task working~')
    done()
}

// 使用gulp方法定义方法,不推荐使用
const gulp = require('gulp')
gulp.task('bar', done => {
    console.log('bar working~')
    done()
})