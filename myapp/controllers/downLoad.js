
const send = require('koa-send');

const path = require('path');

// 下载导出文件
var fn_download = async(ctx, next) => {
		// URL 参数name带文件名
		let fileName = ctx.request.query.name;
		// 当前文件的上级目录
		let dirname = path.resolve(__dirname, '..');
    ctx.attachment(fileName);
    await send(ctx, fileName, {root: dirname + '/upload'});
};

module.exports = {
    'GET /download': fn_download
}