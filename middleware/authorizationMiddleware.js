// 登录鉴权中间件
const {errorMsg} = require('./../util/apiUtils');
const {decrypt} = require('./../util/crypto')

// 路由白名单
const routeWhiteNames = [{
    method: 'POST',
    url: '/api/administrator/login'
},{
    method: 'GET',
    url: '/api/administrator/jsonp'
}];


/**
 * 匹配路由白名单
 * @param routeConfig 路由白名单的配置
 * @param path 当前路径
 * @param method 请求方法的类型
 * @returns {*}
 */
function matchWhite(routeConfig, path, method) {
    const {pathToRegexp} = require('path-to-regexp');
    const reg = pathToRegexp(path);
    return routeConfig.filter(r => {
        return reg.test(r.url) && r.method === method;
    }).length > 0;
}

module.exports = function (req, res, next) {
    // 检验路径是否为白名单,如果是白名单直接走后面的中间件，不需要走token验证
    const path = req.baseUrl + req.path;
    if (matchWhite(routeWhiteNames, path, req.method)) {
        next()
        return;
    }
    // 获取请求中的cookie
    let token = (req.cookies && req.cookies.token) || '';
    if (!token) {
        // 如果是不是浏览器，没有cookie,那么从请求头中获取token
        token = req.headers["authorization"] || '';
    }
    // 判断token是否存在
    if (!token) {
        res.status(401).send(errorMsg('you don\'t have authorization to get the api request, please to login', 401))
    } else {
        req.token = decrypt(token);
        // 存在则走下一步
        next();
    }
}
