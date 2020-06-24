/* 
    Grunt的基本使用
*/
/* 
    Grunt 的入口文件
        用于定义一些需要 Grunt 自动执行的任务
        需要导出一个函数
        此函数接收一个 grunt 的形参，内部提供一些创建任务时可以用到的API
*/

module.exports = grunt => {
    // 定义一个任务，第一个参数时任务名称
    grunt.registerTask('foo', () => {
        console.log('hello grunt~')
        /* 
            `yarn grunt foo`
            输出：
                Running "foo" task
                hello grunt~
        */
    })
    // 如果第二个参数是字符串的话，则是任务的描述内容,会出现在grunt的帮助信息当中。 grunt --help
    grunt.registerTask('bar', '任务描述', () => {
        console.log('other task ~')
        /* 
            `yarn grunt bar`
            输出：
                Running "bar" task
                other task ~
        */
    })
    // 如果参数是default，则为grunt的默认任务
    /* grunt.registerTask('default', () => {
        console.log('i am defalut task')
        
            `yarn grunt`
            输出：
                Running "default" task
                i am defalut task
        
    }) */
    // default的正确打开方式是用来映射其他任务，将第二个参数设置为需要执行的其他任务
    // 这样在运行default之后就会依次执行数组中的任务
    grunt.registerTask('default', ['foo', 'bar'])
        /* 
            `yarn grunt`
            输出：
                Running "foo" task
                hello grunt~

                Running "bar" task
                other task ~
        */
    // 在grunt中异步任务不能自己执行，只能自调用，通过内部执行该异步任务，来触发
    grunt.registerTask('async-task', function () {
        // 声明一个异步
        const done = this.async()
        setTimeout(() => {
            console.log('async task working~')
            /* 
                `yarn grunt async-task`
                输出：
                    Running "async-task" task
                    async task working~
            */
           // 内部调用
            done()
        }, 1000)
    })
}

