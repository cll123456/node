// 书籍模型
const sequelize = require('./../config/db');
const {DataTypes} = require('sequelize');
const moment = require('moment');
module.exports = sequelize.define('Book', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '图书名称'
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '图片'
    },
    publishDate: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: '发布时间',
        get: function (){
            return moment(this.getDataValue('publishDate')).local().format('YYYY-MM-DD hh:mm:ss')
        }
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '作者'
    }
},{
    paranoid: true, //不会真正的删除数据
})
