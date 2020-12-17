// 同步所有的模型
const fs = require('fs');
const path = require('path');
const sequelize = require('./../config/db');

// 获取所有的文件夹名称,自动导入
let fileArr = fs.readdirSync(path.resolve(__dirname, './../models'));
fileArr.filter(item => {
    if (item !== 'asyncAllModels.js' && item !== 'relationTable.js' && item !== 'initModel.js') {
        require('./' + item);
    }
});
// 同步模型
sequelize.sync().then(_ => {
    console.log('所有同步模型成功')
})
