const Koa = require('koa');

const logger = require('koa-logger');

const bodyParser = require('koa-bodyparser');

const koaBody = require('koa-body');

const session = require('koa-session');

const controller = require('./controller');

const template = require('./templating');

const rest = require('./rest');

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';

// 打印请求(<--)\响应(-->)日志
app.use(logger());

// 上传
app.use(koaBody({ multipart: true }));

// session maxAge设置会话保存时间{maxAge: 300000},maxAge: 'session'表示浏览器关闭会话结束
app.keys = ['some secret hurr']; 
app.use(session({maxAge: 'session'},app));

// 1.处理静态文件。static file support:
if (!isProduction) {
    let staticFiles = template.staticFiles;
    app.use(staticFiles('/statics/', __dirname + '/statics'));
}

// 2.解析POST请求。parse request body:
app.use(bodyParser());

// 3.1负责给ctx加上render()来使用Nunjucks。add nunjucks as view:
app.use(template.templating('views', {
    // 开发环境noCache不缓存，可实时监控代码变化，生产环境一定要打开cache,缓存已读内容,这样不会有性能问题。
    noCache: !isProduction,
    watch: !isProduction
}));

// 3.2负责给ctx加上rest()来使用api接口REST
app.use(rest.restify());

// 4.处理URL路由。add controller:
app.use(controller());

// 404页面
app.use(async (ctx, next) => {
  await next();
  // 路由（url）未配置（页面不存在）
  if (ctx.status =='404') {
  	console.log("访问出错，状态码：" + ctx.status + "正在重定向…")
  	ctx.redirect('/404');
  }  
});

// 端口监听
app.listen(8080);
console.log("SERVER START... PORT 8080...");