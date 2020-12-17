// 图书管理员的模型
const sequelize = require('./../config/db');
const {DataTypes} = require('sequelize');
module.exports = sequelize.define('Administrator', {
    loginId: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '账号'
    },
    loginPwd: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '密码'
    },
    username: {
        type: DataTypes.STRING(11),
        comment: '用户名'
    }
},{
    paranoid: true, //不会真正的删除数据
})
