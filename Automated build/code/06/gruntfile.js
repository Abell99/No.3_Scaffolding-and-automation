/* 
    Grunt常用插件及总结
*/
const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')
module.exports = grunt => {
    grunt.initConfig({
        sass: {
            // 指定sass模块
            options: {
                // 可选择性开启Map选项
                sourceMap: true,
                implementation: sass
            },
            // 指定转换路径以及转换的原文件
            main: {
                files: {
                    'dist/css/main.css': 'src/scss/main.scss'
                }
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            main: {
                files: {
                    'dist/js/app.js': 'src/js/app.js'
                }
            }
        },
        watch: {
            js: {
                // 监视源文件的改动
                files: ['src/js/*.js'],
                tasks: ['babel']
            },
            css: {
                files: ['src/scss/*.scss'],
                tasks: ['sass']
            }
        }
    })
    // 声明grunt-sass任务
    // grunt.loadNpmTasks('grunt-sass')
    // grunt.loadNpmTasks('grunt-babel')

    // 自动加载所有的grunt插件中的任务
    loadGruntTasks(grunt)
    /* 
        `yarn grunt 插件名`
    */
    grunt.registerTask('default', ['sass', 'babel', 'watch'])
}

