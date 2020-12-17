// 学生的业务逻辑层
const Student = require('./../models/Student');
const Class = require('./../models/Class');
require('./../models/relationTable');
const {addStudentValidator, updateStudentValidator, idStudentValidator} = require('./../validator/studentValidator')
const {Op} = require("sequelize");

/**
 * 新增学生
 * @param studentObj
 * @constructor
 */
exports.addStudent = async function (studentObj = {}) {
    // 这里不应该使用try catch, 应该在路由层使用 try catch 来进行错误捕获
    // 验证问题
    await addStudentValidator(studentObj);
    const ins = await Student.create(studentObj);
    return ins.toJSON();

}

/**
 * 修改学生
 * @param studentObj {Object} 修改的对象
 * @param id 学生的条件 id
 * @returns {Promise<any>}
 * @constructor
 */
exports.updateStudent = async function (studentObj, id) {
    // 验证编辑学生
    await updateStudentValidator({...studentObj, ...{id}})
    // 修改
    return await Student.update(studentObj, {
        where: {
            id
        }
    })
}

/**
 * 删除学生
 * @param id 学生的id
 * @returns {Promise<number>}
 * @constructor
 */
exports.deleteStudent = async function (id) {
    // 验证删除学生
    await idStudentValidator({id})
    return await Student.destroy({
        where: {
            id
        }
    })
}

/**
 * 分页查询
 * @param pageNumber {Number} 页码
 * @param pageSize {Number} 每页的条数
 * @returns {Promise<{total: number, datas: any}>}
 */
exports.findByPage = async function ({pageNum = 1, pageSize = 10}) {
    if (!Number(pageNum) || !Number(pageSize)) throw Error('pageNum and pageSize is not number');
    const r = await Student.findAndCountAll({
        where: {
            name: {
                [Op.substring]: '陈' // like %亮%
            }
        },
        offset: (pageNum - 1) * pageSize,
        limit: +pageSize,
        attributes: ['name', 'birthday', 'sex', 'age'],
        include: {
            model: Class,
            attributes: ['name']
        },
    });
    return {
        total: r.count,
        datas: JSON.parse(JSON.stringify(r.rows))
    };
}

/**
 * 通过id进行查询
 * @param id
 * @returns {Promise<any>}
 */
exports.findById = async function (id) {
    await idStudentValidator({id})
    const r = await Student.findByPk(id);
    return JSON.parse(JSON.stringify(r));
}
