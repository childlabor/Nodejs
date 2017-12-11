
const Sequelize = require('sequelize');
const mySequelize = require('./mySequelize');

// 2.定义数据模型，告诉Sequelize如何映射数据库表
var user = mySequelize.define('users', {
	  account: {
	    type: Sequelize.STRING(), 
	    primaryKey: true
	    //autoIncrement : true // 定义自增，添加数据时不需填写数据库会自动添加
	  },
	  password: {
	  	type: Sequelize.STRING()
	  }
	}, {
	  timestamps: false
});
user.sync();
module.exports = user;