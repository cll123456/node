// 学生验证器
const validator = require('validate.js');
const {needProps, validateDateTime, isExitsPropInObj, isObject} = require("./validateUtils");
const Student = require('./../models/Student');
const moment = require('moment');
const Class = require('./../models/Class');
const validateMsg = require("./../config/validator/errorMessage.json")

// 对时间的统一验证
validateDateTime();
// 判断classId  StudentId是否有效的验证器
validator.validators.exitsClassId = findClassByID;
validator.validators.exitsStudentId = findStudentByID;
/**
 * 验证添加学生
 * @param studentObj {Object} 需要添加的对象
 * @returns {Promise<any>} 结果，返回undefined 代表没问题，如果是其他代表有问题
 */
exports.addStudentValidator = async function (studentObj) {
    // 检测对象
    isObject(studentObj, 'The student object is null where create student');
    // 获取需要的属性
    studentObj = needProps(studentObj, 'name', 'birthday', 'sex', 'phone', 'ClassId');
    // 使用验证器对属性进行验证
    const rule = {
        name: {
            presence: {
                allowEmpty: false
            },
            type: 'string',
            length: {
                minimum: 1,
                maximum: 10,
            },
        },
        birthday: {
            presence: {
                allowEmpty: false,
            },
            datetime: {
                dateOnly: true,
                earliest: +moment().utc().subtract(100, 'y'), // 最大不能为100
                latest: +moment().utc().subtract(10, 'y') // 最晚不能为10
            }
        },
        sex: {
            presence: true,
            type: 'boolean',
        },
        phone: {
            presence: {
                allowEmpty: false,
            },
            format: {
                pattern: /1\d{10}/
            }
        },
        ClassId: {
            presence: true,
            exitsClassId: true,
            numericality: {
                onlyInteger: true,
                strict: false,
            }
        }
    };
    return await validator.async(studentObj, rule);
}

/**
 * 修改学生的验证器
 * @param studentObj {Object} 学生对象
 * @returns {Promise<any>}
 */
exports.updateStudentValidator = async function (studentObj) {
    // 检测对象
    isObject(studentObj, 'The student object is null where update student');
    if (!studentObj.id) throw Error('The student id is null where update student');
    // 获取需要的属性
    studentObj = needProps(studentObj, 'id', 'name', 'birthday', 'sex', 'phone', 'ClassId');
    const rules = {
        id: {
            presence: {
                notEmpty: false,
            },
            numericality: {
                strict: false,
                onlyInteger: true
            },
            exitsStudentId: true,
        },
        name: {
            type: 'string',
            length: {
                minimum: 1,
                maximum: 10,
            },
            presence: false,
        },
        birthday: {
            presence: false,
            datetime: {
                dateOnly: true,
                earliest: +moment().subtract(100, 'y'),
                latest: +moment().subtract(10, 'y')
            }
        },
        sex: {
            presence: false,
            type: 'boolean'
        },
        phone: {
            presence: false,
            format: {
                pattern: /1\d{10}/
            }
        },
        ClassId: {
            presence: false,
            numericality: {
                strict: false,
                onlyInteger: true
            },
            exitsClassId: true
        }
    }
    return await validator.async(studentObj, rules);
}

/**
 * 学生Id的验证器
 * @param studentObj
 * @returns {Promise<any>}
 */
exports.idStudentValidator = async function (studentObj) {
    isObject(studentObj, 'the studentObj is not null where delete student');
    isExitsPropInObj(studentObj, 'id');
    const rules = {
        id: {
            presence: {
                allowEmpty: false,
            },
            numericality: {
                strict: false,
                onlyInteger: true
            },
            exitsStudentId: true
        }
    }
    return await validator.async(studentObj, rules)
}

/**
 * 通过id 来查找班级是否存在
 * @param id
 * @param options
 * @param key
 * @param attributes
 * @returns {Promise<string>}
 */
async function findClassByID(id, options, key, attributes) {
    if (!attributes.ClassId) return undefined;
    const res = await Class.findByPk(id);
    if (res) {
        return
    }
    return validateMsg.invalidIdMsg;
}

/**
 * 通过id来查找学生是否存在
 * @param id
 * @returns {Promise<string>}
 */
async function findStudentByID(id) {
    const res = await Student.findByPk(id);
    if (res) {
        return
    }
    return validateMsg.invalidIdMsg;
}

