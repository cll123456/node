// 班级的业务逻辑
const Class = require('./../models/Class');
const {classIdExistValidator} = require("../validator/classValidator");
const {updateClassValidator} = require("../validator/classValidator");
const {addClassValidator} = require("../validator/classValidator");

/**
 * 添加一个班级
 * @param classObj
 * @returns {Promise<object>}
 * @constructor
 */
exports.addClass = async function (classObj = {}) {
    // 对添加班级的验证
    await addClassValidator(classObj)
    const ins = await Class.create(classObj);
    return ins.toJSON();
}
/**
 * 修改表
 * @param classObj
 * @param id
 * @returns {Promise<[number, Model[]]>}
 * @constructor
 */
exports.updateClass = async function (classObj, id) {
    // 方法一：
    // 查询实例
    //  const ins = await Class.findByPk(id);
    //  // 赋值
    //  for (let prop in classObj){
    //      ins[prop] = classObj[prop];
    //  }
    // await ins.save();
//    ---------------分割线----------------
    // 方法二：
    // 直接调用修改
    await updateClassValidator({...classObj, ...{id}})
    return await Class.update(classObj, {
        where: {
            id
        }
    });
}

/**
 * 删除数据
 * @param id
 * @returns {Promise<number>}
 * @constructor
 */
exports.deleteClass = async function (id) {
    // 两种方法，第一种，先查，后删，第二种直接删，通过条件
    // 方法一
    // const ins = await Class.findByPk(id);
    // await ins.destroy();
//    ---------------分割线----------------
    // 方法二
    // 直接使用 destroy 方法
    await classIdExistValidator({id})
    return await Class.destroy({
        where: {
            id
        }
    })
}
/**
 * 分页查询
 * @param pageNumber
 * @param pageSize
 * @returns {Promise<{datas: any, count: number}>}
 */
exports.findByPage = async function ({pageNumber, pageSize}) {
    if (!Number(pageNumber) || !Number(pageSize)) throw Error('pageNumber or pageSize is not number in getByPage')
    const r = await Class.findAndCountAll({
        offset: (pageNumber - 1) * pageSize,
        limit: +pageSize
    })
    return {
        count: r.count,
        datas: JSON.parse(JSON.stringify(r.rows))
    }
}

/**
 * 通过id来进行查询
 * @param id
 * @returns {Promise<any>}
 */
exports.findById = async function (id) {
    await classIdExistValidator({id})
    const r = await Class.findByPk(id);
    return JSON.parse(JSON.stringify(r));
}
