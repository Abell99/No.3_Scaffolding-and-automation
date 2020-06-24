/* 
    Grunt多目标任务
*/
module.exports = grunt => {
    // 添加目标
    grunt.initConfig({
        build: {
            css: '1',
            // 目标之中可以添加配置选项，会覆盖多目标任务中的配置选项
            js: {
                name: 'javascript',
                options: {
                    foo: 'abel'
                }
            },
            // 规定字段options,会作为配置选项出现，不会被当作子目标执行
            options: {
                foo: 'bar'
            }
        }
    })
    // 多目标模式，可以让任务根据配置形成多个子任务
    /* 
        直接运行，则执行多目标，也可以指定运行：`yarn grunt build:css`
    */
    grunt.registerMultiTask('build', function () {
        // 通过特定字符可以拿到对应的子目标的名称以及数据
        console.log(`target: ${this.target}, data: ${this.data}`)
        // 配置选项通过options方法可以获取到
        console.log(this.options())
        /* 
            输出结果：
                Running "build:css" (build) task
                target: css, data: 1
                { foo: 'bar' }

                Running "build:js" (build) task
                target: js, data: [object Object]
                { foo: 'abel' }       
        */
    })
}