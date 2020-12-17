// 模拟班级的数据
const Mock = require('mockjs');
const data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|20': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        'name': '前端 @id 班',
        'openDate': '@date'
    }]
}).list;
console.log(data);

const Class = require('./../models/Class');

Class.bulkCreate(data).then(res => {
    console.log(res,' 新增成功')
})

