// 用于加密和解密
// 手动实现对称加密, 使用node 的 crypto库，并且使用里面的 aes-128cbc的模式进行加密
const crypto = require('crypto');

// 创建一个密钥 Math.random().toString(32).slice(-8) + Math.random().toString(32).slice(-8)
const secret = Buffer.from('1u55am8gjesvspiq');
// iv需要使用一个随机的128个字节，并且是长度为16的字符串
let iv = process.env.NODE_ENV === 'development' ? 'jusmbempvlj8kopo' : Math.random().toString(32).slice(-8) + Math.random().toString(32).slice(-8);
iv = Buffer.from(iv);

/**
 * 加密函数
 * @param str
 * @returns {string}
 */
exports.encrypt = function (str) {
    // 创建一个加密对象，使用啥方式加密
    const crt = crypto.createCipheriv("aes-128-cbc", secret, iv);
    // 进行加密，使用输入使用啥编码，输出使用啥编码
    let res = crt.update(str, 'utf-8', 'hex');
    // 最后结果使用啥编码输出
    res += crt.final('hex');
    return res;
}

/**
 * 解密
 * @param str
 * @returns {string}
 */
exports.decrypt = function (str) {
    // 创建一个解密对象，使用啥方式解密
    let dct = crypto.createDecipheriv("aes-128-cbc", secret, iv);
    let re = dct.update(str, 'hex', 'utf-8');
    re += dct.final('utf-8');
    return re;
}

