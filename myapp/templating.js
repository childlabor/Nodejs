// 导入模板引擎
const nunjucks = require('nunjucks');

const path = require('path');

const mime = require('mime');

// 使用了一个mz的包，并通过require('mz/fs');导入。
// mz提供的API和Node.js的fs模块完全相同，但fs模块使用回调，而mz封装了fs对应的函数，并改为Promise。
// 这样，我们就可以非常简单的用await调用mz的函数，而不需要任何回调
const fs = require('mz/fs');

// url: 类似 '/statics/'
// dir: 类似 __dirname + '/statics'
// 接收两个参数：URL前缀和一个目录路径
function staticFiles(url, dir) {
    return async (ctx, next) => {
        let rpath = ctx.request.path; 
        // 判断是否以指定的url开头:
        if (rpath.startsWith(url)) {
            // 获取文件完整路径:
            let fp = path.join(dir, rpath.substring(url.length));
            
            // 判断文件是否存在:
            if (await fs.exists(fp)) {
                // 查找文件的mime:
                ctx.response.type = mime.lookup(rpath);
                // 读取文件内容并赋值给response.body:
                ctx.response.body = await fs.readFile(fp);
            } else {
                // 文件不存在:
                ctx.response.status = 404;
            }
        } else {
            // 不是指定前缀的URL，继续处理下一个middleware:
            await next();
        }
    };
}

// =============================================================================

// configure(配置)函数 最终目的是返回一个 Environment 实例；
function createEnv(path, opts) {
    var
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        // 在开发环境下，可以关闭cache，这样每次重新加载模板，便于实时修改模板。在生产环境下，一定要打开cache，这样就不会有性能问题。
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        // throwOnUndefined为ture时，当输出为 null 或 undefined 会抛出异常
        throwOnUndefined = opts.throwOnUndefined || false,
        // Environment 类用来管理模板，使用他可以加载模板，模板之间可以继承和包含
        env = new nunjucks.Environment(
        	// 只在 node 端可用，他可从文件系统中加载模板
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache,
                watch: watch,
                lstripBlocks : true,
                trimBlocks: true
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
            // 如果传进的参数有filters(自定义过滤器)
    if (opts.filters) {
        for (var f in opts.filters) {
        	// 添加名为 f 的自定义过滤器，opts.filters[f] 为调用的函数
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

// 为ctx设置render()方法；传入模板文件所在目录（path:views），一些自定义变量（opts）
function templating(path, opts) {
    // 创建Nunjucks的env对象:
   	var env = createEnv(path, opts);
    return async (ctx, next) => {
    	
        // 给ctx绑定render函数:(原生的koa ctx没有提供render方法 第一个参数为文件，第二个为变量)
        ctx.render = function (view, model) {
            // 把render后的内容赋值给response.body:
            // Model对象并不是传入的model变量。这个小技巧是为了扩展。
            // Object.assign()会把除第一个参数外的其他参数的所有属性复制到第一个参数中。 
            // 第二个参数是ctx.state || {}，这个目的是为了能把一些公共的变量放入ctx.state并传给View。
            // model || {}确保了即使传入undefined，model也会变为默认值{}。
					try {
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            // 设置Content-Type:
            ctx.response.type = 'text/html';
					} catch(e){
						// 模板not found时处理500错误
							console.log("渲染出错：internal server error…")
            	ctx.redirect('/404');
          }

        }
        
        // 继续处理请求:
        await next();
    };
}

// 导出模板引擎渲染方法
module.exports = {
	"staticFiles": staticFiles,
	"templating": templating
};
