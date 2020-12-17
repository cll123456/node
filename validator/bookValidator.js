// 图书模型的验证器
const {needProps, isObject, validateDateTime} = require("./validateUtils");
const moment = require('moment');
const validator = require('validate.js');
const Book = require('./../models/Book');
const invalidateMsg = require('./../config/validator/errorMessage.json')

validateDateTime();
// 验证book 模型的id 是否存在
validator.validators.extBookID = bookIDExt;
/**
 * 添加图书的验证
 * @param bookObj {Object}
 * @returns {Promise<any>}
 */
exports.addBookValidator = async function (bookObj) {
    isObject(bookObj, 'The bookObj is not object where create book');
    bookObj = needProps(bookObj, 'name', 'picture', 'publishDate', 'author');
    const rules = {
        name: {
            presence: {
                allowEmpty: false
            },
            type: 'string',
            length: {
                minimum: 1,
                maximum: 200
            }
        },
        picture: {
            presence: {
                allowEmpty: false,
            },
            type: 'string',
            format: {
                pattern: /^http:\/\/.*/
            }
        },
        publishDate: {
            presence: {
                allowEmpty: false,
            },
            datetime: {
                latest: +moment().utc().add(1, 'year')
            },
        },
        author: {
            presence: {
                allowEmpty: false
            },
            type: 'string',
            length: {
                minimum: 1,
                maximum: 100
            }
        }
    }
    return await validator.async(bookObj, rules);
}

/**
 * 验证修改book的参数类型
 * @param bookObj
 * @returns {Promise<any>}
 */
exports.updateBookValidator = async function (bookObj) {
    isObject(bookObj, 'The bookObj is not object where update book');
    if (!bookObj.id) throw Error('The book id  is not object where update book')
    bookObj = needProps(bookObj, 'name', 'picture', 'publishDate', 'author');
    const rules = {
        id: {
            presence: {allowEmpty: false},
            numericality: {
                onlyInteger: true,
                strict: false
            },
            extBookID: true
        },
        name: {
            presence: false,
            type: 'string',
            length: {
                minimum: 1,
                maximum: 200
            }
        },
        picture: {
            presence: false,
            type: 'string',
            format: {
                pattern: /^http:\/\/.*/
            }
        },
        publishDate: {
            presence: false,
            datetime: {
                latest: +moment().utc().add(1, 'year')
            },
        },
        author: {
            presence: false,
            type: 'string',
            length: {
                minimum: 1,
                maximum: 100
            }
        }
    }
    return await validator.async(bookObj, rules);
}

/**
 * 验证bookid 是否存在
 * @param bookObj
 * @returns {Promise<any>}
 */
exports.extBookIDValidator = async function (bookObj){
    isObject(bookObj, 'The bookObj is not object where deal book');
    if (!bookObj.id) throw Error('The book id  is not object where deal book')
    bookObj = needProps(bookObj, 'id');
    const rules = {
        id: {
            presence: {allowEmpty: false},
            numericality: {
                onlyInteger: true,
                strict: false
            },
            extBookID: true
        },
    }
    return await validator.async(bookObj, rules);
}

/**
 * 验证book 模型的id 是否存在
 * @param id
 * @returns {Promise<null|string>}
 */
async function bookIDExt(id) {
    const r = await Book.findByPk(id);
    return r ? null : invalidateMsg.invalidIdMsg;
}
