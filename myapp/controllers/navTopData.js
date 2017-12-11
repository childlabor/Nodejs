const NavTopList = require('../models/navTopList');

// async await 完成回调机制，每个await顺序执行并返回结果
var fn_navTopData = async (ctx, next) => {
	var now = Date.now();

	// 增  (首先会尝试进行查询，如果为空则尝试创建，如果是唯一约束则尝试再次查找)
	var newData = await NavTopList.findCreateFind({
		where: { // 条件
      list: '热门新增'
  	},
		defaults: {
			id: now,
	    list: '热门新增',
	    href: 'test/page1'
	  }
	});
	//console.log('已增加');

	// 删
//	var drop = await NavTopList.destroy({
//  where: { 
//    list: '热门新增'
//  }
//	});
	//console.log('已删除');
	
	// 改
//	var change = await NavTopList.findOne({
//  where: { 
//    id: '1'
//  }
//	});
//	change.list === '首页'?change.list = '首页EX':change.list = '首页';
//	await change.save();
	//console.log('更新完成');
	
	// 查
  var navTopData = await NavTopList.findAll();
 // console.log("查到数据数：" + JSON.stringify(navTopData));
 
  // 数据集合 传入模板页
  var items = {
  	username: ctx.session.username,
  	navTopData: navTopData
  };
  
  // 模板渲染
  ctx.render('index.html', items);
};

module.exports = {
  'GET /index': fn_navTopData
}