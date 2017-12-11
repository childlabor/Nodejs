// 不同与mvc,REST模式不直接渲染ctx.render()模板页，而是返回ctx.rest()一个对象(json数据)

const APIError = require('../rest').APIError;

var api_test2 = async (ctx, next) => {
	var data={
		id: '123',
		name: 'childlabor'
	}
	ctx.rest(data);
};

var api_test = async (ctx, next) => {
	var data = ctx.request.query; // 获取url?后的参数
	// 自定义响应条件
	if( data.id == '1'){
    ctx.rest(data);
  } else {
  	throw new APIError('10001', 'id不能为' +data.id);
  }
};

module.exports = {
	'GET /api/test2': api_test2,	
  'POST /api/test': api_test
}
