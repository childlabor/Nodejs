// 导入模板引擎
const koaBody = require('koa-body');

const fs = require('fs');

const os = require('os');

const path = require('path');

const uploadSheet = require('../models/uploadSheet');

var fn_upload = async (ctx, next) => {
	  // ignore non-POSTs
	  if ('POST' != ctx.method) return await next();
	   
		var dirname = path.resolve(__dirname, '..');
		
	  const file = ctx.request.body.files.file;
	  const reader = fs.createReadStream(file.path);
	 
	  const stream = fs.createWriteStream(path.join(dirname, '/upload', file.name));
	  // 上传文件
	  reader.pipe(stream);
	  
	  console.log('上传成功  %s -> %s', file.name, stream.path);
	  
	  // 数据记录数据库
	  var num = file.name.lastIndexOf('.'),
	  		ext = file.name.substring(num+1),
	  		name = file.name.substring(0,num),
	   		now = Date.now();
	   		
		var newData = await uploadSheet.findCreateFind({
			where: { 
	      name: name
	  	},
			defaults: {
				id: now,
		    name: name,
		    ext: ext
		  }
		});
		
	  ctx.redirect('/index');
}

// 导出模板引擎渲染方法
module.exports = {
    'POST /upload': fn_upload
};
