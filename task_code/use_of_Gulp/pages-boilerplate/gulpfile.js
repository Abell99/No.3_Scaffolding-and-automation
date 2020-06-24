// 实现这个项目的构建任务

/* 
    TODO: 两种创建任务的方式 --------------------------------------------
        - 函数导出
        - gulp下的task方法 
*/
/* 
    ---- TODO: 通过导出函数成员的方式来构建任务 ----------------------------
*/ 
/* 
e.g.
    exports.foo = done => {
        console.log('foo task working~')
        // 通过参数传入dneo这个函数，用于表示任务的完成
        done() 
    } 
*/
/* 
    ---- TODO: 通过gulp下的task方法注册任务 ------------------------------
        - 不推荐使用
*/
/* 
e.g.
    const gulp = require('gulp')
    gulp.task('bar', done => {
        console.log('bar working~')
        done(0)
    }) 
*/

/* 
    TODO: Gulp的组合任务 -------------------------------------------------------
        - series 串行
        - parallel 并行
*/
/* 
e.g.
    // 导入gulp下的两个组合方法
    const { series, parallel } = require('gulp')
    exports.foo =  series(task1, task2, task3)
    exports.bar = parallel(task1, task2, task3) 
*/

/* 
    TODO: Gulp的异步任务 --------------------------------------------------------
        - 注意点
            - Gulp中的任务都是异步任务，所以都需要调用done()方法来自主结束任务的运行
            - Gulp中的异步任务与node中相同，错误优先
                - 可以通过 done(new Error('task failed!')) 手动抛出一个错误，用于打断后续任务的执行
            - Gulp中支持Promise方案用来替代回调
                - 通过 return 返回执行结果
                    - Promise.resolve()
                    - Promise.reject(new Error('task failed!'))
            - Gulp同样支持Promise语法糖，async、await来优化异步任务
            - TODO: stream 文件流的方式，Gulp中最为常见的异步任务
                > The streaming build system 这是Gulp的定义，基于流的构建系统
                - fs.createReadStream('package.json')
                - fs.createWriteStream('temp.txt')
*/
// 之所以成为文件流，就是因为与之相关的都是文件处理事件
const fs = require('fs')
// e.g. 文件流的使用
exports.stream = () => {
    // 定义一个文件流对象，读取文件流
    const readStream = fs.createReadStream('package.json')
    // 写入文件流
    const writeStream = fs.createWriteStream('temp.txt')
    /* 
        TODO: pipe方法，通过文件流对象调用，将一个文件流对象导入到另一个文件流对象
            - 功能: 文件复制
            - 可以抽象理解为: 从一个水池子往另一个水池中倒水,谁调用倒谁的水
    */
    readStream.pipe(writeStream)
    // stream事件中隐式包含end事件，所以可以导出一个文件流对象从而来结束该任务，无所谓导出哪一个
    return writeStream
    // 等同于
    /* 
        // 传入done参数,在end事件中执行done()
        readStream.on('end', () => {
            done()
        })
    */
}
/* 
    TODO: 文件操作API与插件的使用 -------------------------------------
        - 文件操作API
            - src 读取流
            - dest 写入流
        - 第三方插件——转换流
            - 通用
                - `gulp-rename` 重命名
            - CSS
                - `gulp-clean-css` 压缩css 
            - 
*/
// 获取gulp模块中的方法
const { src, dest, parallel, series, watch } = require('gulp')
// 定义模板数据
const data = {
    menus: [
        {
        name: 'Home',
        icon: 'aperture',
        link: 'index.html'
        },
        {
        name: 'Features',
        link: 'features.html'
        },
        {
        name: 'About',
        link: 'about.html'
        },
        {
        name: 'Contact',
        link: '#',
        children: [
            {
            name: 'Twitter',
            link: 'https://twitter.com/w_zce'
            },
            {
            name: 'About',
            link: 'https://weibo.com/zceme'
            },
            {
            name: 'divider'
            },
            {
            name: 'About',
            link: 'https://github.com/zce'
            }
        ]
        }
    ],
    pkg: require('./package.json'),
    date: new Date()
}
/*
    ---- TODO: 文件读取写入流的使用 ------------------------------------
        所需:
            - gulp
        e.g.
            export.default = () => {
                // 支持通配符的使用
                src('src/*.css')
                    .pipe(dest('dist'))
            } 
*/
/* 
    ---- TODO: CSS样式文件的构建 ---------------------------------------
        所需:
            - gulp-clean-css
            - sass
        e.g.
            // 导入压缩css的模块
            // css的构建处理，压缩，重命名
*/
const cleanCss = require('gulp-clean-css')
// 导入重命名的模块
// const rename = require('gulp-rename')
// 导入sass模块
const sass = require('gulp-sass')
// 定义样式任务
const style = () => {
    return src('src/assets/styles/*.scss', { base: 'src' })
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(dest('temp'))
        .pipe(bs.reload({ stream: true }))
}
/* 
    ---- TODO: 脚本文件的构建 ------------------------------------------------
        所需:
            - gulp-babel
            - @babel/core @babel/preset-env
        e.g.
            // 导入需要兼容处理的js的模块
            // 脚本文件的ES6语法处理，使浏览器可以识别
*/
const babel = require('gulp-babel')
const script = () => {
    return src('src/assets/scripts/*.js', { base: 'src' })
        // 指定babel(转换平台)中的核心转换模块，需要专门安装
        // @babel/core @babel/preset-env(转换插件的集合，最新转换特性的打包)
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(dest('temp'))
        .pipe(bs.reload({ stream: true }))
}
/* 
    ---- TODO: 页面文件的编译 --------------------------------------------------
        所需:  
            - gulp-swig
        e.g.
            // 模板引擎的使用与渲染

*/
const swig = require('gulp-swig')
const page = () => {
    return src(['src/*.html', 'src/layouts/*.html', 'src/partials/*.html'], { base: 'src' })
        // swig({ data }) 可以指定转换页面中的可变数据
        .pipe(swig({ data }))
        .pipe(dest('temp'))
        .pipe(bs.reload({ stream: true }))
}
/* 
    ---- TODO: 字体、图片转换任务 ---------------------------------------------------
        所需:
            - gulp-imagemin
        e.g.
            // 压缩图片体积
*/
// const imagemin = require('gulp-imagemin')
const image = () => {
    return src('src/assets/images/**', { base: 'src' })
    // 没有VPN，解决不了
    // .pipe(imagemin())
    .pipe(dest('dist'))
}
const font = () => {
    return src('src/assets/fonts/**', { base: 'src' })
    // .pipe(imagemin())
    .pipe(dest('dist'))
}
/* 
    ---- TODO: 处理其他文件及文件的清除 ----------------------------------------------
        所需:
            - del
        e.g.
            // 其他目录下的文件的拷贝
            // 文件的移除-在重新执行任务之前，清除之前任务执行的产物，避免冲突
*/
const del = require('del')
const clean = () => {
    return del(['dist', 'temp'])
}
const extra = () => {
    return src('public/**', { base: 'public' })
        .pipe(dest('dist'))
}
/* 
    ---- TODO: 自动加载插件 ---------------------------------------------------------------
        所需:
            - gulp-load-plugins
        e.g.
            // 使我们可以通过该插件执行所得到的对象，替代之前需要一个一个导入的构建模块,但仍需安装，这个只是自动加载
*/
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()
/* 
    // 无需加载模块插件，即可通过对象调用
    sass({ outputStyle: 'expanded' }) ==> plugins.sass 
*/
/* 
    ---- TODO: 热更新开发服务器 ------------------------------------------------------------
        所需: 
            - browser-sync
        e.g.
            // 使我们能够看到编译的效果
*/
const browserSync = require('browser-sync')
// 创建开发服务器
const bs = browserSync.create()
const serve = () => {
    // 监视构建前的文件，发生改变的时候自动构建。通过自动构建改变dist的内容，从而实现热更新
    watch('src/assets/styles/*.scss', style)
    watch('src/assets/scripts/*.js', script)
    watch(['src/*.html', 'src/layouts/*.html', 'src/partials/*.html'], page)
    // 当这些文件发生改变的时候，重新启动服务器
    watch(['src/assets/images/**', 'src/assets/fonts/**', 'public/**'], bs.reload)
    bs.init({
        // 设置不显示，构建过程的加载信息
        notify: false,
        // 设置端口
        port: 2080,
        // 自动打开浏览器
        open: true,
        // 指定监视内容，发生改变自动更新浏览器
        // files: 'dist/**',
        server: {
            // 网站基准地址，依次查找
            baseDir: ['temp', 'src', 'public'],
            // 处理页面中的请求路由，使其在本地服务阶段能够正确的找到模块包资源 
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    })
}
/* 
    ---- TODO: 处理上线后，包资源的引用不受影响------------------------------------
        所需: 
            - gulp-useref
        e.g.
            // 使项目上线后仍可以访问道link访问的资源包
        ---- TODO: 压缩----------------------------------------------------
        所需: 
            - gulp-htmlmin
            - gulp-uglify
            - gulp-clean-css
            - gulp-if
        e.g.
            // 压缩文件，使上线时的体积更小
            // 判断文档内容类型，决定压缩方法
*/
const useref = () => {
    return src('temp/*.html', { base: 'dist' })
        // 采用自动加载插件的方法处理文件流中的流动,根据构建注释来完成该过程
        .pipe(plugins.useref({ searchPath: ['dist', '.'] }))
        // 判断类型并压缩
        .pipe(plugins.if(/\.js$/, plugins.uglify()))
        .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
        // 额外设置，用于指定文档内部的css、js、html的压缩方式
        .pipe(plugins.if(/\.html$/, plugins.htmlmin({ collapseWhitespace: true, minifyCSS: true, minifyJS: true })))
        .pipe(dest('dist'))
}

// TODO: 任务的整合和导出 ------------------------------------------------------------------------

// 并行任务:parallel
// 串行任务:series

// compile,转换src目录下的文件,按目录划分转换组合,更为整洁
const compile = parallel(style, script, page)

// 编译脚本和样式
const lint = parallel(style, script)

// 上线之前执行的任务
const build =  series(
  clean,
  parallel(
    series(compile, useref),
    image,
    font,
    extra
  )
)

// 开发中执行
const start = series(compile, serve)

module.exports = {
  clean,
  lint,
  serve,
  build,
  start
}


