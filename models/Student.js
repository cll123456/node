const sequelize = require('./../config/db');
const {DataTypes} = require('sequelize');
const moment = require('moment');
const Student = sequelize.define('Student', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '姓名'
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: '生日',
        // 访问器 获取的时间都转为本地时间，存入的时候统一试用utc
        get(){
            return moment(this.getDataValue('birthday')).local().format('YYYY-MM-DD hh:mm:ss')
        }
    },
    // 虚拟字段
    age: {
        type: DataTypes.VIRTUAL,
        // 访问器
        get() {
            return moment().utc().diff(moment.utc(this.birthday), 'year');
        },
    },
    sex: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: true,
        comment: '性别'
    },
    phone: {
        type: DataTypes.STRING(11),
        allowNull: false,
        comment: '联系电话'
    }
}, {
    paranoid: true, //不会真正的删除数据
})

module.exports = Student
