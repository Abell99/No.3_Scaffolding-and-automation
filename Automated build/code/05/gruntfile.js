/* 
    Grunt插件的使用
*/
module.exports = grunt => {
    grunt.initConfig({
        clean: {
            // 支持通配符 ‘temp/**’,则表示删除temp目录下所有的文件以及子目录
            temp: 'temp/*.js',
        }
    })
    grunt.loadNpmTasks('grunt-contrib-clean')
}