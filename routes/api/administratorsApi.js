// 关于administrator对外暴露的api
const express = require('express');
const administratorRoute = express.Router();
const administratorSer = require('./../../services/AdministratorService');
const {handleAsyncApi} = require('./../../util/apiUtils')

administratorRoute.get('/', handleAsyncApi(getAllAdministrator, '查询成功'));
administratorRoute.get('/:id', handleAsyncApi(getAdministratorById, '查询成功'));
administratorRoute.post('/', handleAsyncApi(saveAdministrator, '添加成功'));
administratorRoute.put('/:id', handleAsyncApi(uptAdministrator, '修改成功'));
administratorRoute.delete('/:id', handleAsyncApi(delAdministrator, '删除成功'));


/**
 * 获取所有的图书管理员
 * @param req
 * @param res
 * @param next
 * @returns {Promise<{total: number, datas: *}>}
 */
async function getAllAdministrator(req, res, next) {
    return await administratorSer.findAllAdmins();
}

/**
 * 通过id来获取图书管理员
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
async function getAdministratorById(req, res, next) {
    const id = req.params.id;
    return await administratorSer.findAdminById(id);
}

/**
 * 添加图书管理员
 * @param req
 * @param res
 * @param next
 * @returns {Promise<object>}
 */
async function saveAdministrator(req, res, next) {
    const administratorObj = req.body;
    return await administratorSer.addAdministrator(administratorObj);
}

/**
 * 修改图书管理员
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
async function uptAdministrator(req, res, next) {
    const id = req.params.id;
    const uptObj = req.body;
    return await administratorSer.updateAdministrator(uptObj, id);
}

/**
 * 删除图书管理员
 * @param req
 * @param res
 * @param next
 * @returns {Promise<number>}
 */
async function delAdministrator(req, res, next) {
    const id = req.params.id;
    return await administratorSer.deleteAdministrator(id)
}

module.exports = administratorRoute;
