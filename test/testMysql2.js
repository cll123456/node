// mysql2 在项目中不直接使用，一般会使用orm,

// 使用回调的方式来进行对数据的crud
const mysql = require('mysql2');


// 连接数据库 不使用数据连接池
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'studydb'
});

// 新增
connection.query("insert into employee ( name, location, ismale, joinDate, salary, deptId, birthday) values ('测试', '江西省南昌上', 1, CURDATE(), 1000, 2, CURDATE())",
    (err, res) => {
        console.log(res, '------')
    })

// 修改语句

connection.query("update employee set name = '我修改名字了' where id = 1000",
    (err, res) => {
        console.log(res, '更新语句操作');
    })
// 删除数据
connection.query("delete from employee where name like '%测试%'",
    (err, res) => {
        console.log(res, '测试删除');
    })
// 简单的查询
connection.query(
    'SELECT * FROM `employee` WHERE `id` = 1',
    function (err, results, fields) {
        console.log(results); // results contains rows returned by server
    }
);


// 关闭连接
connection.end();