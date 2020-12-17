// 使用异步的方式来连接数据库，相对于上面的，语义上比较好理解，返回的是promise
// 使用返回promise的mysql连接
const mysql = require('mysql2/promise');

// (async () => {
//     const readFileContentByStream = require('./../util/readFileContentByFS');
//     // 获取配置文件里面的数据库账号和密码等
//     const fileRs = await readFileContentByStream('./../config/databaseConfig.json');
//     // 建立连接
//     const connect = await mysql.createConnection(fileRs);
//
//     // 新增
//     const [ResultSetHeader] = await connect.query("insert into employee ( name, location, ismale, joinDate, salary, deptId, birthday) values ('测试', '江西省南昌上', 1, CURDATE(), 1000, 2, CURDATE())",)
//     console.log(ResultSetHeader, '----')
// // 修改语句
//
//     const res = await connect.query("update employee set name = '我修改名字了' where id = 1000")
//     console.log(res, '====')
// // // 删除数据
// //     connect.query("delete from employee where name like '%测试%'",
// //         (err, res) => {
// //             console.log(res, '测试删除');
// //         })
// // 简单的查询
//     const getDataById = await connect.query('SELECT * FROM `employee` WHERE `id` = 1');
//     console.log(getDataById[0])
// })()

// 使用数据连接池
(async () => {
    const readFileContentByStream = require('./../util/readFileContentByFS');
    // 获取配置文件里面的数据库账号和密码等
    const fileRs = await readFileContentByStream('./../config/databaseConfig.json');
    // 建立连接
    const connect = await mysql.createPool(fileRs);

    // 新增
    const [ResultSetHeader] = await connect.execute("insert into employee ( name, location, ismale, joinDate, salary, deptId, birthday) values ('测试', '江西省南昌上', 1, CURDATE(), 1000, 2, CURDATE())",)
    console.log(ResultSetHeader, '----')
// 修改语句

    const res = await connect.execute("update employee set name = '我修改名字了' where id = 1000")
    console.log(res, '====')
// // 删除数据
    const deleteData = await connect.execute("delete from employee where name like '%测试%'");
    console.log(deleteData)
// 简单的查询
    const getDataById = await connect.execute('SELECT * FROM `employee` WHERE `id` = 1');
    console.log(getDataById[0])
})()



