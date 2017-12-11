
// 三级目录下的文件
var fn_btPage = async(ctx, next) => {
    var view = ctx.path.substring(1);  
    ctx.render(view + '.html', items);
};

// 二级目录下的文件
var fn_subPage = async(ctx, next) => {
    var view = ctx.path.substring(1); // 切去开头的'/'
    ctx.state = {
        'navTop': [
            { 'name': '首页', 'href': '/index' },
            { 'name': '区域市场', 'href': '/test/page1' },
            { 'name': '财务管理', 'href': '/test/page1' },
            { 'name': '专利交易', 'href': '/test/page1' },
            { 'name': '系统设置', 'href': '/test/page1' }
        ]
    }; 
    ctx.render(view + '.html');
};

// 一级目录下的文件
var fn_rootPage = async(ctx, next) => {
    var view = ctx.params.name,
        items = ctx.request.query;
    ctx.render(view + '.html', items);
};

// 404
var fn_404 = async(ctx, next) => {
    ctx.render('404.html');
};

module.exports = {
    'GET /:sub/:bottom/:name': fn_btPage,
    'GET /templating/:name': fn_subPage,
    'GET /404': fn_404
}