/* 
    Gulp的文件操作API
 */
// 文件操作的api:src,dest
const { src, dest } = require('gulp')
// 文件压缩插件
const cleanCss = require('gulp-clean-css')
// 重命名插件
const rename = require('gulp-rename')
// 返回默认
exports.default = () => {
        // 读取文件
    return src('src/*.css')
        // 文件转换
        .pipe(cleanCss())
        // 重命名
        .pipe(rename({ extname: '.min.css' }))
        // 写文件
        .pipe(dest('dist'))
}