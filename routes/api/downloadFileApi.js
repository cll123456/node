const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const {errorMsg} = require("../../util/apiUtils");


router.get('/:fileName', async (req, res) => {
    const filePath = path.resolve(__dirname, `./../../public/upload/${req.params.fileName}`)
    const fileExit = await exitsFile(filePath);
    if (fileExit) {
        res.download(filePath, req.params.fileName);
    } else {
        errorMsg('文件不存在');
    }
})

/**
 * 判断文件是否存在
 * @param absPath 文件的路径
 * @returns {Promise<*>}
 */
async function exitsFile(absPath) {
    const stats = await fs.statSync(absPath);
    return stats.isFile()
}

module.exports = router;
