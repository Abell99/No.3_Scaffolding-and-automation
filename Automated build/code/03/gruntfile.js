/* 
    grunt配置选项方法
*/
module.exports = grunt => {
    // 添加配置选项
    grunt.initConfig({
        foo: 'bar',
        // 配置选项支持对象格式
        obj: {
            bar: 123
        }
    })

    grunt.registerTask('foo', () => {
        // 访问配置选项
        console.log(grunt.config('foo')) // 输出结果：bar
        console.log(grunt.config('obj.bar')) // 输出结果：123
    })
}