// 管理员模型的验证器
const {needProps, isObject, validateDateTime} = require("./validateUtils");
const moment = require('moment');
const validator = require('validate.js');
const Administrator = require('./../models/Administrator');
const invalidateMsg = require('./../config/validator/errorMessage.json')

validateDateTime();
// 验证administrator 模型的id 是否存在
validator.validators.extAdministratorID = administratorIDExt;
/**
 * 添加管理员的验证
 * @param administrator {Object}
 * @returns {Promise<any>}
 */
exports.addAdministratorValidator = async function (administrator) {
    isObject(administrator, 'The administrator is not object where create administrator');
    administrator = needProps(administrator, 'username', 'loginPwd', 'loginId');
    const rules = {
        username: {
            presence: {
                allowEmpty: false
            },
            type: 'string',
            length: {
                minimum: 1,
                maximum: 20
            }
        },
        loginPwd: {
            presence: {
                allowEmpty: false,
            },
            type: 'string',
            length: {
                is: 32
            }
        },
        loginId: {
            presence: {
                allowEmpty: false
            },
            type: 'string',
            length: {
                minimum: 1,
                maximum: 20,
            }
        }
    }
    return await validator.async(administrator, rules);
}

/**
 * 验证修改administrator的参数类型
 * @param administrator
 * @returns {Promise<any>}
 */
exports.updateAdministratorValidator = async function (administrator) {
    isObject(administrator, 'The administrator is not object where update administrator');
    if (!administrator.id) throw Error('The administrator id  is not object where update administrator')
    administrator = needProps(administrator, 'name', 'picture', 'publishDate', 'author');
    const rules = {
        id: {
            presence: {allowEmpty: false},
            numericality: {
                onlyInteger: true,
                strict: false
            },
            extAdministratorID: true
        },
        username: {
            presence: false,
            type: 'string',
            length: {
                minimum: 1,
                maximum: 20
            }
        },
        loginPwd: {
            presence: false,
            type: 'string',
            length: {
                is: 32
            }
        },
        loginId: {
            presence: false,
            type: 'string',
            length: {
                minimum: 1,
                maximum: 20,
            }
        }
    }
    return await validator.async(administrator, rules);
}

/**
 * 验证administratorid 是否存在
 * @param administrator
 * @returns {Promise<any>}
 */
exports.extAdministratorIDValidator = async function (administrator) {
    isObject(administrator, 'The administrator is not object where deal administrator');
    if (!administrator.id) throw Error('The administrator id  is not object where deal administrator')
    administrator = needProps(administrator, 'id');
    const rules = {
        id: {
            presence: {allowEmpty: false},
            numericality: {
                onlyInteger: true,
                strict: false
            },
            extAdministratorID: true
        }
    }
    return await validator.async(administrator, rules);
}

/**
 * 验证administratorIDExt 模型的id 是否存在
 * @param id
 * @returns {Promise<null|string>}
 */
async function administratorIDExt(id) {
    const r = await Administrator.findByPk(id);
    return r ? null : invalidateMsg.invalidIdMsg;
}
