// 数据库连接配置

const {Sequelize} = require('sequelize');

// 获取数据库的配置文件
const dbSets = require('./databaseConfig.json');
// 记录日志
const {sqlLogger} = require('./logger');

// 连接数据库
const sequelize = new Sequelize(dbSets.database, dbSets.user, dbSets.password, {
    host: dbSets.host,
    dialect: dbSets.dialect, /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
    logging: (msg) => {
        return sqlLogger.debug(msg) // 记录日志
    }
});

module.exports = sequelize;
