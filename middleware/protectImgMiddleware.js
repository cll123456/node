// 图片防盗链处理的中间件
const url = require('url');
const path = require('path');

module.exports = (req, res, next) => {
    // 判断后缀名是否为一个图片，如果不是图片，直接放行
    const extArr = ['.jpg', '.jpeg', '.png', '.gif'];
    const ext = path.extname(req.url);
    if (!extArr.includes(ext)) {
        next();
        return;
    }
    const oriHost = req.headers['host'];
    let refHost = req.headers['referer'];
    if (refHost) {
        refHost = url.parse(refHost).host;
    }
    // 别人在盗用你的图片l
    if (refHost && refHost !== oriHost) {
        req.url = '/upload/wuqing.gif'; // 重定向图片地址
    }
    next();
}
