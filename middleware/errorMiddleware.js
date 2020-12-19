/**
 * 错误处理中间件
 * @param err 错误信息
 * @param req 请求信息
 * @param res 响应信息
 * @param next 调用下一个处理函数
 */
module.exports = function (err, req, res, next) {
    // 如果错误不存在，直接调用后序的中间件
    if (!err) next();
    const errObj = {
        code: 500,
        msg:  err instanceof Error ? err.message : '处理错误'
    }
    res.status(errObj.code).send(errObj);
}
