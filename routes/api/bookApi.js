// 关于book对外暴露的api
const express = require('express');
const bookRoute = express.Router();
const bookSer = require('./../../services/BookService');
const {handleAsyncApi} = require('./../../util/apiUtils')

bookRoute.get('/', handleAsyncApi(getBookByPage, '查询成功'));
bookRoute.get('/:id', handleAsyncApi(getBookById, '查询成功'));
bookRoute.post('/', handleAsyncApi(saveBook, '添加成功'));
bookRoute.put('/:id', handleAsyncApi(uptBook, '修改成功'));
bookRoute.delete('/:id', handleAsyncApi(delBook, '删除成功'));


/**
 * 分页获取图书
 * @param req
 * @param res
 * @param next
 * @returns {Promise<{total: number, datas: *}>}
 */
async function getBookByPage(req, res, next) {
    const pageNum = req.query.pageNum || 1;
    const pageSize = req.query.pageSize || 10;
    return await bookSer.findByPage({pageNum, pageSize});
}

/**
 * 通过id来获取图书
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
async function getBookById(req, res, next) {
    const id = req.params.id;
    return await bookSer.findById(id);
}

/**
 * 添加图书
 * @param req
 * @param res
 * @param next
 * @returns {Promise<object>}
 */
async function saveBook(req, res, next) {
    const bookObj = req.body;
    return await bookSer.addBook(bookObj);
}

/**
 * 修改图书
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
async function uptBook(req, res, next) {
    const id = req.params.id;
    const uptObj = req.body;
    return await bookSer.updateBook(uptObj, id);
}

/**
 * 删除图书
 * @param req
 * @param res
 * @param next
 * @returns {Promise<number>}
 */
async function delBook(req, res, next) {
    const id = req.params.id;
    return await bookSer.deleteBook(id)
}

module.exports = bookRoute;
