// 验证器相关的工具类
const moment = require('moment');
const validate = require('validate.js');
/**
 * 获取验证器所需要的属性，多余的属性给排斥在外
 * @param obj {Object} 对象
 * @param props  剩余参数
 * @returns {{}|*}
 */
exports.needProps = function (obj, ...props) {
    if (!obj || typeof obj !== 'object') return obj;
    const newObj = {};
    for (const propsKey in obj) {
        if (props.includes(propsKey)) {
            newObj[propsKey] = obj[propsKey];
        }
    }
    return newObj;
}

/**
 * 拓展时间验证函数
 */
exports.validateDateTime = function () {
    validate.extend(validate.validators.datetime, {
        // 对传入的日期进行进行解析成 utc 的时间戳格式
        parse: function (value, options) {
            let formats = options.dateOnly ? ["YYYY-MM-DD", "YYYY-M-D", "YYYY/MM/DD", "YYYY/MD", 'x']
                : ["YYYY-MM-DD hh:mm:ss", "YYYY-M-D h:m:s", "YYYY/MM/DD hh:mm:ss", "YYYY/MD h:m:s", 'x'];
            return moment.utc(value, formats, true).valueOf();
        },
        // 用于展示错误信息的时间格式
        format: function (value, options) {
            let formats = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss';
            return moment(value).format(formats);
        }
    })

}

/**
 * 判断是否是一个有效对象
 * @param obj {Object}
 * @param remark {String} 备注
 */
exports.isObject = function (obj, remark) {
    if (!obj || typeof obj !== 'object') throw Error(remark);
}

/**
 * 判断某个属性是否存在默认对象
 * @param obj {Object} 对象
 * @param props 属性
 */
exports.isExitsPropInObj = function (obj, ...props) {
    props.forEach(item => {
        if (!obj[item]) {
            throw Error(item + 'is not exits in' + obj);
        }
    })
}
