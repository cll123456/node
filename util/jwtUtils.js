// jwt (json web token)的方式来验证登录
// 主要提供两个方法，
//  1.颁发一个jwt给客户端
//  2.验证客户端返回的jwt是否正确，是否被人修改过

const jwt = require('jsonwebtoken');
const {errorMsg} = require("./apiUtils");
const secret = process.env.NODE_ENV === 'development' ? 'chenliangliang' : Date.now() + Math.random().toString(32).slice(-8);

/**
 * 颁发一个jwt
 * @param res 响应对象
 * @param expr 有效期
 * @param info 响应的时间
 */
exports.publish = function (res, info, expr = 7 * 24 * 3600 * 1000,) {
    // 主要发给客户端的信息
    const payload = {data: info}
    const token = jwt.sign(payload, secret,{
        expiresIn: expr
    });
    // 此时，将token,放入cookie或者，放入请求头中
    res.cookie('token', token, {
        maxAge: expr
    });
    res.header('authorization', token);
}

/**
 * 验证jwt是否正确
 * @param req
 * @param res
 * @param next
 */
exports.verify = function (req, res, next) {
    // 从cookie中取，或者从authorization中获取
    let token;
    token = (req.cookies && req.cookies.token) || '';
    if (!token) {
        // 从请求头中获取
        token = req.headers['authorization'] || '';
    }
    // token存在，验证token的正确性
    if (token) {
        token = token.split(" ");
        token = token.length === 1 ? token[0] : token[1];
        try {
           const r = jwt.verify(token, secret);
            next();
            return;
        } catch (err) {
            console.log(err);
            res.status(401).send(errorMsg('you don\'t have authorization to get the api request, please to login', 401))
        }
    }
    // 不存在
    res.status(401).send(errorMsg('you don\'t have authorization to get the api request, please to login', 401))

}
