/*
 * 处理url函数解析总模块
 */

// 先导入fs模块(node.js内置模块负责读写文件)，然后用readdirSync同步方法列出目录
const fs = require('fs');

// add url-route in /controllers:

// 解析js文件内module.exports的处理函数，mapping：目标文件夹内js文件的所有module.exports出的变量合集
function addMapping(router, mapping) {
    for (var url in mapping) {
        // 如果url类似"GET xxx"
        if (url.startsWith('GET ')) {
            // 切除前四个字符即 / 前的'GET '
            var path = url.substring(4);  
            // mapping[url]通过url查找mapping数组内的url处理函数
            router.get(path, mapping[url]);
            // console.log(`step2: 取得js文件的中间件的函数;register URL mapping: GET ${path}`);
            // 如果url类似"POST xxx": 
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            // console.log(`step2: 取得js文件的中间件的函数;register URL mapping: POST ${path}`);
        } else if (url.startsWith('PUT ')) {
            var path = url.substring(4);
            router.put(path, mapping[url]);
            // console.log(`step2: 取得js文件的中间件的函数;register URL mapping: PUT ${path}`);
        } else if (url.startsWith('DELETE ')) {
            var path = url.substring(7);
            router.del(path, mapping[url]);
            // console.log(`step2: 取得js文件的中间件的函数;register URL mapping: DELETE ${path}`);
        } else {
            // 无效的URL:
            console.log(`invalid URL: ${url}`);
        }
    }
}

// 目标文件夹内所有需要解析的处理函数集合。参数传入路由模块和处理程序所在文件夹目录(一般为controllers)
function addControllers(router, dir) {
    // 先导入fs模块，然后用readdirSync列出目标文件夹(controllers)内所有js文件，
    // 此处同步方法sync,列出所有符合的内容后才能继续执行后续代码
    fs.readdirSync(__dirname + '/' + dir).filter((f) => {
        // 找出所有.js后缀的文件
        return f.endsWith('.js');
    }).forEach((f) => {
        // console.log(`step1: 遍历指定文件夹内(controllers)所有js文件;process controller: ${f}...`);
        // 将js文件的所有module.exports出的变量(键)集合成数组。
        let mapping = require(__dirname + '/' + dir + '/' + f);
        addMapping(router, mapping);
    });
}

// 导出函数 外部文件require后可直接调用函数
module.exports = function(dir) {
    let controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    // add router middleware:
    return router.routes();
};
