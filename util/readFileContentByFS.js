// 读取文件内容

const fs = require('fs');
const path = require('path');
/**
 * 通过内置的fs来，读取文件内容，适用于读取小文件
 * @param fileName {String} 文件路劲
 * @returns {Promise<*|*>}
 */
module.exports = function (fileName = '') {
    if (fileName.length === 0) return '';
    // 获取文件的根路径
    const dirName = path.resolve(__dirname, fileName);
    // 由于文件并不大，所以可以不使用流来读取
    let fileContent = fs.readFileSync(dirName, 'utf-8');
    fileContent = JSON.parse(fileContent);
    return fileContent;
}