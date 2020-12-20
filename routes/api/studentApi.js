// 关于学生对外暴露的api
const express = require('express');
const stuRoute = express.Router();
const stuSer = require('./../../services/StudentService');
const {handleAsyncApi} = require('./../../util/apiUtils')

stuRoute.get('/', handleAsyncApi(getStuByPage, '查询成功'));
stuRoute.get('/:id', handleAsyncApi(getStuById, '查询成功'));
stuRoute.post('/', handleAsyncApi(saveStu, '添加成功'));
stuRoute.put('/:id', handleAsyncApi(uptStu, '修改成功'));
stuRoute.delete('/:id', handleAsyncApi(delStu, '删除成功'));


/**
 * 分页获取学生
 * @param req
 * @param res
 * @param next
 * @returns {Promise<{total: number, datas: *}>}
 */
async function getStuByPage(req, res, next) {
    const pageNum = req.query.pageNum || 1;
    const pageSize = req.query.pageSize || 10;
    return await stuSer.findByPage({pageNum, pageSize});
}

/**
 * 通过id来获取学生
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
async function getStuById(req, res, next) {
    const id = req.params.id;
    return await stuSer.findById(id);
}

/**
 * 添加学生
 * @param req
 * @param res
 * @param next
 * @returns {Promise<object>}
 */
async function saveStu(req, res, next) {
    const stuObj = req.body;
    return await stuSer.addStudent(stuObj);
}

/**
 * 修改学生
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
async function uptStu(req, res, next) {
    const id = req.params.id;
    const uptObj = req.body;
    return await stuSer.updateStudent(uptObj, id);
}

/**
 * 删除学生
 * @param req
 * @param res
 * @param next
 * @returns {Promise<number>}
 */
async function delStu(req, res, next) {
    const id = req.params.id;
    return await stuSer.deleteStudent(id)
}

module.exports = stuRoute;
