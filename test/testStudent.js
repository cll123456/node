const studentServ = require('./../services/StudentService');

// studentServ.findByPage({pageNumber: 1, pageSize: 10}).then(r => {
//     console.log(r, '分页查询学生')
// })

// studentServ.addStudent({name: '', birthday: '2010-2-9', sex: true, phone: '18720897941', ClassId: '1'}).then(r => {
//     console.log(r,'---')
// }).catch(err => {
//     console.log(err,'+++++')
// })


// studentServ.updateStudent({
//     name: '陈亮亮',
//     birthday: '2200-1-2',
//     ClassId: '12'
// }, 7000).then(r => {
//     console.log(r, '---')
// }).catch(err => {
//     console.log(err, '+++++')
// })

// studentServ.deleteStudent(701).then(r => {
//     console.log(r, '---')
// }).catch(err => {
//     console.log(err, '+++++')
// })

studentServ.findByPage({pageNum: 1, pageSize: 20}).then(r => {
    console.log(r, '---')
}).catch(err => {
    console.log(err, '+++++')
})
