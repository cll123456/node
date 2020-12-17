// mock学生数据

const Mock = require('mockjs');

const list = Mock.mock({
    'list|700': [{
        'name': '@cname',
        'birthday': '@date',
        'sex|1-2': true,
        'phone': /1\d{10}/,
        'ClassId|1-20':2
    }]
}).list;

console.log(list)

const Student = require('./../models/Student');
require('./../models/relationTable')
Student.bulkCreate(list).then(res => {
    console.log('新增成功')
})

