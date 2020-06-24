/* 
    Grunt标记失败任务
*/ 
module.exports = grunt => {
    grunt.registerTask('bad', '一个注定失败的任务', () => {
        console.log('bad workding~')
        return false
    })

    grunt.registerTask('foo', '正常的任务', () => {
        console.log('other task ~')
    }) 
    
    grunt.registerTask('bar', '正常的任务', () => {
        console.log('other task ~')
    })

    // 使用default执行连续任务的时候，如果出现任务错误，会导致所有任务失败。
    grunt.registerTask('default', ['bad', 'foo', 'bar'])

    // 解决方法：`yarn grunt --force`
    /*  
        执行结果：   
        Running "bad" task
        bad workding~
        Warning: Task "bad" failed. Used --force, continuing.

        Running "foo" task
        other task ~

        Running "bar" task
        other task ~ 
    */
}