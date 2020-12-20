// 关于班级对外暴露的api
const express = require('express');
const classRoute = express.Router();
const classSer = require('./../../services/ClassService');
const {handleAsyncApi} = require('./../../util/apiUtils')

classRoute.get('/', handleAsyncApi(getClassByPage, '查询成功'));
classRoute.get('/:id', handleAsyncApi(getClassById, '查询成功'));
classRoute.post('/', handleAsyncApi(saveClass, '添加成功'));
classRoute.put('/:id', handleAsyncApi(uptClass, '修改成功'));
classRoute.delete('/:id', handleAsyncApi(delClass, '删除成功'));


/**
 * 分页获取班级
 * @param req
 * @param res
 * @param next
 * @returns {Promise<{total: number, datas: *}>}
 */
async function getClassByPage(req, res, next) {
    const pageNum = req.query.pageNum || 1;
    const pageSize = req.query.pageSize || 10;
    return await classSer.findByPage({pageNum, pageSize});
}

/**
 * 通过id来获取班级
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
async function getClassById(req, res, next) {
    const id = req.params.id;
    return await classSer.findById(id);
}

/**
 * 添加班级
 * @param req
 * @param res
 * @param next
 * @returns {Promise<object>}
 */
async function saveClass(req, res, next) {
    const classObj = req.body;
    return await classSer.addClass(classObj);
}

/**
 * 修改班级
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
async function uptClass(req, res, next) {
    const id = req.params.id;
    const uptObj = req.body;
    return await classSer.updateClass(uptObj, id);
}

/**
 * 删除班级
 * @param req
 * @param res
 * @param next
 * @returns {Promise<number>}
 */
async function delClass(req, res, next) {
    const id = req.params.id;
    return await classSer.deleteClass(id)
}

module.exports = classRoute;
