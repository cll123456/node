/**
 * 错误信息的包装
 * @param msg 消息
 * @returns {{msg, code: number}} 结果收集一个错误的对象
 */
exports.errorMsg = function (msg) {
    return {
        code: 500,
        msg: msg
    }
}

/**
 * 正确格式的统一包装返回
 * @param msg
 * @param datas
 * @returns {{msg, code: number, datas}}
 */
exports.successMsg = function (msg, datas) {
    return {
        code: 200,
        msg: msg,
        datas: datas
    }
}

/**
 * 处理所有api函数的公共方法，用于处理异步
 * @param handle
 * @param msg {String} 消息返回的正确结果
 * @returns {function(*, *, *): Promise<void>}
 */
exports.handleAsyncApi = function (handle, msg) {
    return async (req, res, next) => {
        try {
            const r = await handle(req, res, next);
            const rInfo = exports.successMsg(msg || '操作成功', r)
            res.status(200).send(rInfo)
        } catch (err) {
            // 交给下一个错误中间件来处理
            next(err)
        }
    }
}
