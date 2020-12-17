// 班级验证器
const {isObject, validateDateTime, needProps} = require("./validateUtils");
const validator = require('validate.js');
const moment = require('moment');
const Class = require("../models/Class");
const validateMsg = require("./../config/validator/errorMessage.json")

// 验证时间格式
validateDateTime()

// 验证id时否存在
validator.validators.existClassById = getInfoByClassId;
/**
 * 添加学生的验证器
 * @param classObj
 * @returns {Promise<any>}
 */
exports.addClassValidator = async function (classObj) {
    isObject(classObj, 'The class object is null where create class');
    classObj = needProps(classObj, 'name', 'openDate');
    // 对属性进行验证
    const rules = {
        name: {
            presence: {
                allowEmpty: false
            },
            type: 'string',
            length: {
                minimum: 1,
                maximum: 10
            }
        },
        openDate: {
            presence: {
                allowEmpty: false
            },
            datetime: {
                dateOnly: true,
                earliest: +moment().utc().subtract(100, 'y'), // 开班日期不能早于100年
                latest: +moment().utc().add(1, 'month'), // 开班日期不能超过当前一个月
            }
        }
    };
    return await validator.async(classObj, rules);
}
/**
 * 修改学生验证器
 * @param classObj
 * @returns {Promise<any>}
 */
exports.updateClassValidator = async function (classObj) {
    isObject(classObj, 'The class object is null where update class');
    if (!classObj.id) throw Error('The id is null where update class');
    classObj = needProps(classObj, 'name', 'openDate', 'id');
    // 进行规则验证
    const rules = {
        id: {
            presence: {
                allowEmpty: false
            },
            existClassById: true,
            numericality: {
                onlyInteger: true,
                strict: false,
            }
        },
        name: {
            presence: false,
            type: 'string',
            length: {
                minimum: 1,
                maximum: 10
            }
        },
        openDate: {
            presence: false,
            datetime: {
                dateOnly: true,
                earliest: +moment().utc().subtract(100, 'year'),
                latest: +moment().utc().add(1, 'month')
            }
        }
    }
    return await validator.async(classObj, rules);
}
/**
 * 验证班级id是否存在
 * @param obj
 * @returns {Promise<any>}
 */
exports.classIdExistValidator = async function (obj) {
    isObject(obj, 'The class object is null where in class');
    if (!obj.id) throw Error('The id is null where in class');
    obj = needProps(obj, 'id');
    const rules = {
        id: {
            presence: {
                allowEmpty: false
            },
            numericality: {
                onlyInteger: true,
                strict: false
            },
            existClassById: true
        }
    }
    return validator.async(obj, rules);
}

/**
 * 通过id来查找班级信息
 * @param id
 * @returns {Promise<null|string>}
 */
async function getInfoByClassId(id) {
    const res = await Class.findByPk(id);
    return res ? null : validateMsg.invalidIdMsg
}
