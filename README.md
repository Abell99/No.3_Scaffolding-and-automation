# No.3_Scaffolding-and-automation
 fed-e-task-02-01



> 拉钩大前端训练营第一期学员
>
> 姓名：职铭想

# 简答题

##### 1、谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值。

> 答：
>
> - 前端工程化主要解决的问题
>
>   > 从脚手架和自动化构建的角度分析
>
>   - 传统语言或语法的弊端
>   - 无法使用模块化/组件化
>   - 重复的机械式工作
>   - 代码风格统一、质量保证
>   - 依赖后端服务接口支持
>   - 整体依赖后端项目

##### 2、你认为脚手架除了为我们创建项目结构，还有什么更深的意义？

> 答：
>
> - 创建项目基础结构，提供项目规范和约定
>
>   > 脚手架的作用	
>
>   - 相同的组织结构	
>   - 相同的开发范式
>   - 相同的模块依赖
>   - 相同的工具配置
>   - 相同的基础代码
>
> - 更深的意义
>
>   > 在我们需要多次复用一个项目结构模板的时候，可以为我们节省很多的精力。

# 编程题

##### 1、概述脚手架实现的过程，并使用 NodeJS 完成一个自定义的小型脚手架工具

> 我的自定义脚手架用于自动生成我的听课笔记以及代码的目录结构
>
> - 使用脚手架: `npm i generator-abel-sc`
> - 脚手架仓库地址:  `https://github.com/Abell99/generator-sc`

> 内容解析：
>
> ```js
> /* 
>     - 注意事项:
>         - 此文件是Generator的核心入口
>         - Yeoman Generator在工作的时候会自动调用我们在此类型中定义的一些生命周期方法
>             - eg: prompting () 、 writing ()
>         - 我们在这些方法中可以通过调用父类提供的一些工具方法实现一些功能
>             - eg: this.prompt() 、 this.fs.write() 、 this.fs.copyTpl()
> */
> 
> // 导入模块，从而返回子类，形成一个标准的generator模块
> const Generator = require('yeoman-generator')
> // 返回子类
> module.exports = class extends Generator {  // 规定需要导出一个继承自Yeoman Generator 的类型
>     // generator中高度封装的fs方法集,功能更加强大
>     /*
>         TODO: prompting () ------------------------------------
>         Yeoman会在询问用户环节自动调用此方法
>         作用:
>             - 询问用户，获取字段值
>     */
>     prompting () {
>         /* 
>             ---- TODO: fs.prompt() 方法对用户发起命令行询问---------
>             注意:这是一个 promise
>         */
>         return this.prompt([
>             // 每一个数组对象就是一个问题的设置
>             {
>                 type: 'input', // 类型
>                 name: 'title', // 询问结果对应的字段
>                 message: 'The name of the section', // 问题的询问语句
>                 default: this.appname + ' ↓ ' // 默认值，this.appname 指向当前目录的名称
>             }
>         ])
>         // 对结果的处理
>         .then(answers => {
>             // 询问的结果，会以键值对的形式返回
>                 // eg: answers => { title: 'users input' }
>             // 将询问的结果挂载到this对象上面，方便在写入文件阶段(writing)使用
>             this.answers = answers
>         })
>     }
>     /* 
>         TODO: writing () ---------------------------------------
>         Yeoman会自动在文件阶段调用此方法
>         作用:
>             - 写入文件
>     */
>     writing () {
>         /* 
>             ---- TODO: fs.write () 写文件方法的使用---------------------
>             注意：不能和fs.copyTpl同时使用
>         */
>         /* this.fs.write(
>             // 第一个参数，生成文件的目标地址
>             this.destinationPath('temp.txt'),
>             // 第二个参数，生成的文件的内容
>             Math.random().toString()
>         ), */
>         /*
>             ---- TODO: fs.copyTpl () 根据模板文件生成文件----------------
>         */
>         // 获取第一个参数: 模板文件路径
>         const tmpl = ['title/code/explain.txt', 'title/notes/title.md']
>         // 获取第二个参数: 输出目标的路径, 可以更改生成目标的文件名称
>         const output = [`${this.answers.title}/code/explain.txt`, `${this.answers.title}/notes/${this.answers.title}.md`]
>         // 第三个参数: 编辑模板数据上下文
>         const context = { title: this.answers.title }
>         // 通过模板方式写入文件到目标目录
>         tmpl.forEach((item, index) => {
>             this.fs.copyTpl(
>                 this.templatePath(item), 
>                 this.destinationPath(output[index]),
>                 context
>             )
>         })
>     }
> }
> ```

##### 2、尝试使用 Gulp 完成 [项目](https://github.com/lagoufed/fed-e-code/blob/master/part-02/module-01/作业案例基础代码.zip?raw=true) 的自动化构建

> 作业地址：https://github.com/Abell99/No.3_Scaffolding-and-automation/tree/master/task_code/use_of_Gulp/pages-boilerplate
>
> 内容解析：
>
> ```js
> // 实现这个项目的构建任务
> 
> /* 
>     TODO: 两种创建任务的方式 --------------------------------------------
>         - 函数导出
>         - gulp下的task方法 
> */
> /* 
>     ---- TODO: 通过导出函数成员的方式来构建任务 ----------------------------
> */ 
> /* 
> e.g.
>     exports.foo = done => {
>         console.log('foo task working~')
>         // 通过参数传入dneo这个函数，用于表示任务的完成
>         done() 
>     } 
> */
> /* 
>     ---- TODO: 通过gulp下的task方法注册任务 ------------------------------
>         - 不推荐使用
> */
> /* 
> e.g.
>     const gulp = require('gulp')
>     gulp.task('bar', done => {
>         console.log('bar working~')
>         done(0)
>     }) 
> */
> 
> /* 
>     TODO: Gulp的组合任务 -------------------------------------------------------
>         - series 串行
>         - parallel 并行
> */
> /* 
> e.g.
>     // 导入gulp下的两个组合方法
>     const { series, parallel } = require('gulp')
>     exports.foo =  series(task1, task2, task3)
>     exports.bar = parallel(task1, task2, task3) 
> */
> 
> /* 
>     TODO: Gulp的异步任务 --------------------------------------------------------
>         - 注意点
>             - Gulp中的任务都是异步任务，所以都需要调用done()方法来自主结束任务的运行
>             - Gulp中的异步任务与node中相同，错误优先
>                 - 可以通过 done(new Error('task failed!')) 手动抛出一个错误，用于打断后续任务的执行
>             - Gulp中支持Promise方案用来替代回调
>                 - 通过 return 返回执行结果
>                     - Promise.resolve()
>                     - Promise.reject(new Error('task failed!'))
>             - Gulp同样支持Promise语法糖，async、await来优化异步任务
>             - TODO: stream 文件流的方式，Gulp中最为常见的异步任务
>                 > The streaming build system 这是Gulp的定义，基于流的构建系统
>                 - fs.createReadStream('package.json')
>                 - fs.createWriteStream('temp.txt')
> */
> // 之所以成为文件流，就是因为与之相关的都是文件处理事件
> const fs = require('fs')
> // e.g. 文件流的使用
> exports.stream = () => {
>     // 定义一个文件流对象，读取文件流
>     const readStream = fs.createReadStream('package.json')
>     // 写入文件流
>     const writeStream = fs.createWriteStream('temp.txt')
>     /* 
>         TODO: pipe方法，通过文件流对象调用，将一个文件流对象导入到另一个文件流对象
>             - 功能: 文件复制
>             - 可以抽象理解为: 从一个水池子往另一个水池中倒水,谁调用倒谁的水
>     */
>     readStream.pipe(writeStream)
>     // stream事件中隐式包含end事件，所以可以导出一个文件流对象从而来结束该任务，无所谓导出哪一个
>     return writeStream
>     // 等同于
>     /* 
>         // 传入done参数,在end事件中执行done()
>         readStream.on('end', () => {
>             done()
>         })
>     */
> }
> /* 
>     TODO: 文件操作API与插件的使用 -------------------------------------
>         - 文件操作API
>             - src 读取流
>             - dest 写入流
>         - 第三方插件——转换流
>             - 通用
>                 - `gulp-rename` 重命名
>             - CSS
>                 - `gulp-clean-css` 压缩css 
>             - 
> */
> // 获取gulp模块中的方法
> const { src, dest, parallel, series, watch } = require('gulp')
> // 定义模板数据
> const data = {
>     menus: [
>         {
>         name: 'Home',
>         icon: 'aperture',
>         link: 'index.html'
>         },
>         {
>         name: 'Features',
>         link: 'features.html'
>         },
>         {
>         name: 'About',
>         link: 'about.html'
>         },
>         {
>         name: 'Contact',
>         link: '#',
>         children: [
>             {
>             name: 'Twitter',
>             link: 'https://twitter.com/w_zce'
>             },
>             {
>             name: 'About',
>             link: 'https://weibo.com/zceme'
>             },
>             {
>             name: 'divider'
>             },
>             {
>             name: 'About',
>             link: 'https://github.com/zce'
>             }
>         ]
>         }
>     ],
>     pkg: require('./package.json'),
>     date: new Date()
> }
> /*
>     ---- TODO: 文件读取写入流的使用 ------------------------------------
>         所需:
>             - gulp
>         e.g.
>             export.default = () => {
>                 // 支持通配符的使用
>                 src('src/*.css')
>                     .pipe(dest('dist'))
>             } 
> */
> /* 
>     ---- TODO: CSS样式文件的构建 ---------------------------------------
>         所需:
>             - gulp-clean-css
>             - sass
>         e.g.
>             // 导入压缩css的模块
>             // css的构建处理，压缩，重命名
> */
> const cleanCss = require('gulp-clean-css')
> // 导入重命名的模块
> // const rename = require('gulp-rename')
> // 导入sass模块
> const sass = require('gulp-sass')
> // 定义样式任务
> const style = () => {
>     return src('src/assets/styles/*.scss', { base: 'src' })
>         .pipe(sass({ outputStyle: 'expanded' }))
>         .pipe(dest('temp'))
>         .pipe(bs.reload({ stream: true }))
> }
> /* 
>     ---- TODO: 脚本文件的构建 ------------------------------------------------
>         所需:
>             - gulp-babel
>             - @babel/core @babel/preset-env
>         e.g.
>             // 导入需要兼容处理的js的模块
>             // 脚本文件的ES6语法处理，使浏览器可以识别
> */
> const babel = require('gulp-babel')
> const script = () => {
>     return src('src/assets/scripts/*.js', { base: 'src' })
>         // 指定babel(转换平台)中的核心转换模块，需要专门安装
>         // @babel/core @babel/preset-env(转换插件的集合，最新转换特性的打包)
>         .pipe(babel({ presets: ['@babel/preset-env'] }))
>         .pipe(dest('temp'))
>         .pipe(bs.reload({ stream: true }))
> }
> /* 
>     ---- TODO: 页面文件的编译 --------------------------------------------------
>         所需:  
>             - gulp-swig
>         e.g.
>             // 模板引擎的使用与渲染
> 
> */
> const swig = require('gulp-swig')
> const page = () => {
>     return src(['src/*.html', 'src/layouts/*.html', 'src/partials/*.html'], { base: 'src' })
>         // swig({ data }) 可以指定转换页面中的可变数据
>         .pipe(swig({ data }))
>         .pipe(dest('temp'))
>         .pipe(bs.reload({ stream: true }))
> }
> /* 
>     ---- TODO: 字体、图片转换任务 ---------------------------------------------------
>         所需:
>             - gulp-imagemin
>         e.g.
>             // 压缩图片体积
> */
> // const imagemin = require('gulp-imagemin')
> const image = () => {
>     return src('src/assets/images/**', { base: 'src' })
>     // 没有VPN，解决不了
>     // .pipe(imagemin())
>     .pipe(dest('dist'))
> }
> const font = () => {
>     return src('src/assets/fonts/**', { base: 'src' })
>     // .pipe(imagemin())
>     .pipe(dest('dist'))
> }
> /* 
>     ---- TODO: 处理其他文件及文件的清除 ----------------------------------------------
>         所需:
>             - del
>         e.g.
>             // 其他目录下的文件的拷贝
>             // 文件的移除-在重新执行任务之前，清除之前任务执行的产物，避免冲突
> */
> const del = require('del')
> const clean = () => {
>     return del(['dist', 'temp'])
> }
> const extra = () => {
>     return src('public/**', { base: 'public' })
>         .pipe(dest('dist'))
> }
> /* 
>     ---- TODO: 自动加载插件 ---------------------------------------------------------------
>         所需:
>             - gulp-load-plugins
>         e.g.
>             // 使我们可以通过该插件执行所得到的对象，替代之前需要一个一个导入的构建模块,但仍需安装，这个只是自动加载
> */
> const loadPlugins = require('gulp-load-plugins')
> const plugins = loadPlugins()
> /* 
>     // 无需加载模块插件，即可通过对象调用
>     sass({ outputStyle: 'expanded' }) ==> plugins.sass 
> */
> /* 
>     ---- TODO: 热更新开发服务器 ------------------------------------------------------------
>         所需: 
>             - browser-sync
>         e.g.
>             // 使我们能够看到编译的效果
> */
> const browserSync = require('browser-sync')
> // 创建开发服务器
> const bs = browserSync.create()
> const serve = () => {
>     // 监视构建前的文件，发生改变的时候自动构建。通过自动构建改变dist的内容，从而实现热更新
>     watch('src/assets/styles/*.scss', style)
>     watch('src/assets/scripts/*.js', script)
>     watch(['src/*.html', 'src/layouts/*.html', 'src/partials/*.html'], page)
>     // 当这些文件发生改变的时候，重新启动服务器
>     watch(['src/assets/images/**', 'src/assets/fonts/**', 'public/**'], bs.reload)
>     bs.init({
>         // 设置不显示，构建过程的加载信息
>         notify: false,
>         // 设置端口
>         port: 2080,
>         // 自动打开浏览器
>         open: true,
>         // 指定监视内容，发生改变自动更新浏览器
>         // files: 'dist/**',
>         server: {
>             // 网站基准地址，依次查找
>             baseDir: ['temp', 'src', 'public'],
>             // 处理页面中的请求路由，使其在本地服务阶段能够正确的找到模块包资源 
>             routes: {
>                 '/node_modules': 'node_modules'
>             }
>         }
>     })
> }
> /* 
>     ---- TODO: 处理上线后，包资源的引用不受影响------------------------------------
>         所需: 
>             - gulp-useref
>         e.g.
>             // 使项目上线后仍可以访问道link访问的资源包
>         ---- TODO: 压缩----------------------------------------------------
>         所需: 
>             - gulp-htmlmin
>             - gulp-uglify
>             - gulp-clean-css
>             - gulp-if
>         e.g.
>             // 压缩文件，使上线时的体积更小
>             // 判断文档内容类型，决定压缩方法
> */
> const useref = () => {
>     return src('temp/*.html', { base: 'dist' })
>         // 采用自动加载插件的方法处理文件流中的流动,根据构建注释来完成该过程
>         .pipe(plugins.useref({ searchPath: ['dist', '.'] }))
>         // 判断类型并压缩
>         .pipe(plugins.if(/\.js$/, plugins.uglify()))
>         .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
>         // 额外设置，用于指定文档内部的css、js、html的压缩方式
>         .pipe(plugins.if(/\.html$/, plugins.htmlmin({ collapseWhitespace: true, minifyCSS: true, minifyJS: true })))
>         .pipe(dest('dist'))
> }
> 
> // TODO: 任务的整合和导出 ------------------------------------------------------------------------
> 
> // 并行任务:parallel
> // 串行任务:series
> 
> // compile,转换src目录下的文件,按目录划分转换组合,更为整洁
> const compile = parallel(style, script, page)
> 
> // 编译脚本和样式
> const lint = parallel(style, script)
> 
> // 上线之前执行的任务
> const build =  series(
>   clean,
>   parallel(
>     series(compile, useref),
>     image,
>     font,
>     extra
>   )
> )
> 
> // 开发中执行
> const start = series(compile, serve)
> 
> module.exports = {
>   clean,
>   lint,
>   serve,
>   build,
>   start
> }
> ```

##### 3、使用 Grunt 完成 [项目](https://github.com/lagoufed/fed-e-code/blob/master/part-02/module-01/作业案例基础代码.zip?raw=true) 的自动化构建

> 作业地址：https://github.com/Abell99/No.3_Scaffolding-and-automation/tree/master/task_code/use_of_Grunt/pages-boilerplate
>
> 内容解析：
>
> ```js
> // 实现这个项目的构建任务
> 
> const sass = require('sass')
> const loadGruntTasks = require('load-grunt-tasks')
> module.exports = grunt => {
>     grunt.initConfig({
>         sass: {
>             // 指定sass模块
>             options: {
>                 // 可选择性开启Map选项
>                 sourceMap: true,
>                 implementation: sass
>             },
>             // 指定转换路径以及转换的原文件
>             main: {
>                 files: {
>                     'dist/assets/styles/main.css': 'src/assets/styles/main.scss'
>                 }
>             }
>         },
>         babel: {
>             options: {
>                 sourceMap: true,
>                 presets: ['@babel/preset-env']
>             },
>             main: {
>                 files: {
>                     'dist/assets/scripts/main.js': 'src/assets/scripts/main.js'
>                 }
>             }
>         },
>         watch: {
>             js: {
>                 // 监视源文件的改动
>                 files: ['src/assets/scripts/*.js'],
>                 tasks: ['babel']
>             },
>             css: {
>                 files: ['src/assets/style/*.scss'],
>                 tasks: ['sass']
>             }
>         }
>     })
>     // 声明grunt-sass任务
>     // grunt.loadNpmTasks('grunt-sass')
>     // grunt.loadNpmTasks('grunt-babel')
> 
>     // 自动加载所有的grunt插件中的任务
>     loadGruntTasks(grunt)
>     /* 
>         `yarn grunt 插件名`
>     */
>     grunt.registerTask('default', ['sass', 'babel', 'watch'])
> }
> ```

## 说明：

本次作业的中的编程题要求大家完成相应代码过后，录制一个小视频简单介绍一下实现思路，演示一下相应功能。最终将录制的视频和代码统一提交至作业仓库。

