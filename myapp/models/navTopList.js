
const Sequelize = require('sequelize');
const mySequelize = require('./mySequelize');

// 2.定义数据模型，告诉Sequelize如何映射数据库表
var NavTopList = mySequelize.define('navTopLists', {
	  id: {
	    type: Sequelize.BIGINT, 
	    primaryKey: true
	   // autoIncrement : true // 定义自增，添加数据时不需填写数据库会自动添加
	  },
	  list: {
	  	type: Sequelize.STRING(),
	  	unique: true
	  },
	  href: {
	  	type: Sequelize.STRING()
	  }
	}, {
	  timestamps: false
});

// 创建表
NavTopList.sync();

module.exports = NavTopList;