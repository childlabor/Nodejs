
const user = require('../models/user');

var fn_login = async(ctx, next) => {
	// 获取跳转到登录页面前的地址，保存在session中，登录成功后转回该页面
	//ctx.session.refer = ctx.header.referer;
	ctx.render('login.html');
};

var fn_signup = async(ctx, next) => {
	ctx.render('signup.html');
};

// 登录
var fn_signin = async(ctx, next) => {
  var account = ctx.request.body.account || '',
      password = ctx.request.body.password || '';
  
  var role = await user.findOne({
    where: { 
      account: account
    }
	});
	// 数据表中有数据
	if (role !== null) {
		if (password === role.password) {
			// 设置session
			ctx.session.username = role.account;
//			var referer = ctx.session.refer || 'index';
//			ctx.redirect(referer);
				ctx.redirect('index');
		} else {
				// 当验证不通过时	
		      var message = '密码错误！';
		      var items = {
		      	msg: message,
		      	account: account
		      };
		      ctx.render('login.html', items)
		}	
	} else {
    var message = '账号不存在！';
    var items = {
    	msg: message
    };
    ctx.render('login.html', items)
	}
};

var fn_logout = async(ctx, next) => {
	ctx.session = null;
  await ctx.redirect('/');
}

//async function sleep(timeout) {  
//return new Promise((resolve, reject) => {
//  setTimeout(function() {
//    resolve();
//  }, timeout);
//});
//}

var fn_register = async(ctx, next) => {
    var account = ctx.request.body.account,
        password = ctx.request.body.password;
    var role = await user.findCreateFind({
			where: { 
	      account: account
	  	},
			defaults: {
				password: password,
		    account: account
		  }
		});
		var items = {
			register: '注册成功',
			password: password,
		  account: account
		};

		// TODO: 添加延时定时 提示注册成功后再重定向
		//ctx.render('signup.html',items);
		//await sleep(5000);
		ctx.redirect('/');

};

module.exports = {
		'GET /': fn_login, // 初始登录页
    'POST /signin': fn_signin, // 登录提交
    'GET /logout': fn_logout, // 登出
    'GET /signup': fn_signup, // 注册页
    'POST /regist': fn_register // 注册提交
}