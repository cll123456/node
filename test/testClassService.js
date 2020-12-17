const classSer = require('../services/ClassService')
// 测试新增方法
// classSer.addClass({name: '测试1班', openDate: '2022-1-1'}).then(res => {
//     console.log('新增的结果如下',res)
// }).catch(err => {
//     console.log(err, '++++++++');
// })

// 测试修改方法
// classSer.updateClass({name: '测试班级3', openDate: '2020-2-9'}, 29).then(res => {
//     console.log('修改的结果如下', res)
// }).catch(err => {
//     console.log(err, '+++++')
// })


// classSer.deleteClass(29).then(res => {
//     console.log('删除的结果如下', res)
// }).catch(err => {
//     console.log(err, '+++++')
// })

const AdminSer = require('../services/AdministratorService');

// AdminSer.addAdministrator({loginId: 'admin', loginPwd: 'admin123', username: 'admin'}).then(r => {
//     console.log(r, '新增成功！')
// })

// AdminSer.FindAdminById('5').then(r => {
//     console.log(r,'通过id查询的管理员信息')
// })


// AdminSer.Login({loginId: 'Admin', loginPwd: 'admin123'}).then(r => {
//     console.log(r, '登录成功');
// })

setInterval(_ => {
    AdminSer.findAllAdmins().then(r => {
        console.log(r, '查询所有管理员成功');
    })
}, 200)

