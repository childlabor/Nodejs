基于 nodejs 的简单后台
-----
###### 实现功能：
1. 模板页面渲染、路由跳转
2. 数据库增删改查
3. 上传、下载
4. 注册、登录、登出

###### 应用模块：
- 底层： `Node v7.6.0`以上版本
- 框架：`Koa2`
- 模板引擎： `Nunjucks`
- 数据库：`mySQL`
- ORM: `Sequelize`
- 具体依赖包及bebal详见 `package.json`

###### 测试方法：
1. 将`myapp`文件下载至本地
2. `cmd` 进入数据库（确保本地已安装mySQL数据库）,`create database test` 创建test数据库;也可在`config.js`里修改数据库参数
3. 命令行进入app文件夹 `npm install` 安装依赖包
4. `npm start` 运行程序
5. 打开`http://localhost:8080` 查看

------------------
