// 管理员的业务逻辑层
const Administrator = require('./../models/Administrator');
const md5 = require('md5');
const {
    extAdministratorIDValidator,
    updateAdministratorValidator,
    addAdministratorValidator
} = require('./../validator/adminValidator')

/**
 * 新增管理员
 * @param adminObj
 * @returns {Promise<*>}
 * @constructor
 */
exports.addAdministrator = async function (adminObj = {}) {
    if (adminObj.loginPwd) adminObj.loginPwd = md5(adminObj.loginPwd);
    await addAdministratorValidator(adminObj);
    // 用户存入数据库需要加密
    const ins = await Administrator.create(adminObj);
    return ins.toJSON();
}

/**
 * 修改管理员
 * @param adminObj
 * @param id
 * @returns {Promise<[number, Model[]]>}
 * @constructor
 */
exports.updateAdministrator = async function (adminObj, id) {
    if (adminObj.loginPwd) adminObj.loginPwd = md5(adminObj.loginPwd);
    await updateAdministratorValidator({...adminObj, ...{id}})
    return await Administrator.update(adminObj, {
        where: {
            id
        }
    })
}

/**
 * 删除一个管理员
 * @param id
 * @returns {Promise<number>}
 * @constructor
 */
exports.deleteAdministrator = async function (id) {
    await extAdministratorIDValidator({id})
    return await Administrator.destroy({
        where: {
            id
        }
    })
}

/***
 * 通过id 来查找数据
 * @param id {String} 管理员的id
 * @returns {Promise<any>} 结果
 * @constructor
 */
exports.findAdminById = async function (id) {
    await  extAdministratorIDValidator({id})
    const res = await Administrator.findByPk(id);
    return JSON.parse(JSON.stringify(res.dataValues))
}

/**
 * 登录
 * @param loginId
 * @param loginPwd
 * @returns {Promise<null|any>}
 * @constructor
 */
exports.login = async function ({loginId, loginPwd}) {
    if (!loginPwd || !loginId) throw new Error('loginId or loginPwd is invalid');
    if (!!loginPwd) loginPwd = md5(loginPwd);
    const res = await Administrator.findOne({
        where: {
            loginId,
            loginPwd,
        }
    })
    const result = JSON.parse(JSON.stringify(res.dataValues));
    if (result.loginId === loginId) return result;
    else return null;
}

/**
 * 查询所有的管理员
 * @returns {Promise<any>}
 * @constructor
 */
exports.findAllAdmins = async function () {
    const res = await Administrator.findAll();
    return JSON.parse(JSON.stringify(res))
}
