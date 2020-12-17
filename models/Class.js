// 班级模型
const sequelize = require('./../config/db');
const {DataTypes} = require('sequelize');
const Class = sequelize.define('Class', {
    name: {
        type: DataTypes.STRING(15),
        allowNull: false,
        comment: '班级名称'
    },
    openDate: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: '开班时间'
    }
},{
    paranoid: true, //不会真正的删除数据
})

module.exports = Class;