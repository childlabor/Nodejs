/* 使用Sequelize操作数据库的一般步骤就是：
 * 首先，通过某个Model对象的findAll()方法获取实例；
 * 如果要更新实例，先对实例属性赋新值，再调用save()方法；
 * 如果要删除实例，直接调用destroy()方法。
 * findAll()方法可以接收where、order这些参数，这和将要生成的SQL语句是对应的
 */

// 顶级对象，可以通过该对象来访问模块中子对象
const Sequelize = require('sequelize');
const config = require('../config');

// 1.创建一个sequelize对象实例
// 传入1数据库名、2用户名、3密码，还可以传入一个可选的4options参数对象
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host, // 连接数据库的主机
    dialect: 'mysql', // 要连接的数据库类型
    pool: { // 使用连接池连接
        max: 5, // 连接数
        min: 0,
        idle: 30000 // 连接最大空置时间（毫秒），超时后将释放连接
    }
});

module.exports = sequelize;