// 书籍的业务逻辑层
const Book = require('./../models/Book');
const {addBookValidator, extBookIDValidator, updateBookValidator} = require("../validator/bookValidator");

/**
 * 新增图书
 * @param bookObj {Object}
 * @returns {Promise<object>}
 * @constructor
 */
exports.addBook = async function (bookObj) {
    await addBookValidator(bookObj);
    const ins = await Book.create(bookObj)
    return ins.toJSON();
}
/**
 * 修改图书
 * @param bookObj
 * @param id
 * @returns {Promise<[number, Model[]]>}
 * @constructor
 */
exports.updateBook = async function (bookObj, id) {
    await updateBookValidator({...bookObj, ...{id}});
    return await Book.update(bookObj, {
        where: {
            id
        }
    })
}

/**
 * 删除图书
 * @param id
 * @returns {Promise<number>}
 * @constructor
 */
exports.deleteBook = async function (id) {
    await extBookIDValidator({id});
    return await Book.destroy({
        where: {
            id
        }
    })
}
/**
 * 分页查询
 * @param pageSize {Number} 每页的条数
 * @param pageNum {Number} 当前第几页
 * @returns {Promise<{total: number, datas: any}>}
 */
exports.findByPage = async function ({pageSize, pageNum}) {
    if (!Number(pageSize) || !Number(pageNum)) throw Error('pageSize or pageNum is not number in findByPage on bookService')
    // 方法一：
    // const total = await Book.count();
    // const res = await Book.findAll({
    //     offset: (currentPage - 1) * pageSize,
    //     limit: +pageSize
    // });
    // return {
    //     total,
    //     datas: JSON.parse(JSON.stringify(res))
    // }


    // 方法二：
    const res = await Book.findAndCountAll({
        where: {
            // 加其他需要的条件
        },
        // 需要展示的属性
        offset: (pageNum - 1) * pageSize,
        limit: +pageSize
    })
    return {
        count: res.count,
        datas: JSON.parse(JSON.stringify(res.rows))
    }
}

/**
 * 通过id查询
 * @param id
 * @returns {Promise<any>}
 */
exports.findById = async function (id) {
    await extBookIDValidator({id});
    const r = await Book.findByPk(id);
    return JSON.parse(JSON.stringify(r));
}
