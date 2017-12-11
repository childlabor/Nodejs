// api接口（REST）中间件

module.exports = {
	
		// 当客户端收到REST响应后，根据判断条件 选择返回错误信息（可在任何地方抛出错误）
    APIError: function (code, message) {
        this.code = code || 'internal:unknown_error';
        this.message = message || '';
    },
    
    // REST API前缀，默认为/api/:
    restify: (pathPrefix) => {	 
        pathPrefix = pathPrefix || '/api/';
        return async (ctx, next) => {
        	
        		// 是否是REST API前缀?
            if (ctx.request.path.startsWith(pathPrefix)) {
                console.log(`Process API ${ctx.request.method} ${ctx.request.url}...`);
                
                // 绑定rest()方法,在controller直接调用
                ctx.rest = (data) => {
                    ctx.response.type = 'application/json';
                    ctx.response.body = data;
                }                
                try {
                    await next();
                } catch (e) {
                		// API请求出错时，返回错误信息
                    console.log('Process API error...');
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        code: e.code || 'internal:unknown_error',
                        message: e.message || ''
                    };
                }
            } else {
                await next();
            }
        };
    }
};