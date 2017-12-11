// ================ 练习笔记 =========================

/*
 * "koa": "2.0.0", 框架    
 * "koa-router": "7.0.0", 路由
 * "koa-bodyparser": "3.2.0" post方法下请求数据的解析
 * "nunjucks": "2.4.2", 模板引擎
 * "chokidar": "^1.7.0"， 已安装可选引擎依赖 chokidar，watch如果为 true，当文件系统上的模板变化了，系统会自动更新他。
 * "mysql": "2.11.1" MySQL数据库在 Node.js驱动程序
 * "sequelize": "3.24.1", 数据库ORM（对象关系映射）框架
 */


/*
 * 安装npm 依赖包：npm ERR! Please try running this command again as root/Administrator.
 * 解决:
 * 		1.cmd管理员打开 cd到目标文件夹 安装(若仍报错执行2); 
 * 		2.需要删除npmrc文件。强调：不是nodejs安装目录npm模块下的那个npmrc文件,而是在C:\Users\{账户}\下的.npmrc文件
 */
 
 
/*
 * 流程：
 * 	1. 创建服务器  'app.listen(8080)';
 * 	2. 配置路由 controller.js;
 * 	3. 编写路由执行函数 controllers文件夹内并用ctx.render()渲染；
 * 		3.1 ctx.request.query解析查询字符串为对象;
 *  	3.2  在模板引擎文件templating.js内，为ctx设置render()方法,渲染页面;
 * 	4. 配置静态资源 (整合在了templating.js内的staticFiles(url, dir));
 *  5. 编写模板页 (views内);
 *  6. models文件夹负责将数据模型导出，controllers内负责数据模型的数据处理，并传入模板页渲染
 * 
 */
