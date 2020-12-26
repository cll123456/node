const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const {successMsg} = require("../../util/apiUtils");
// 文件存入磁盘
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, './../../public/upload'))
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const fileName = Date.now() + '-' + Math.random().toString(36).slice(-6) + ext;
        cb(null, fileName)
    }
})
const upload = multer({storage});

router.post('/', upload.single('img'), (req, res) => {
    const obj = successMsg('上传成功', {
        url: 'upload/' + req.file.filename,
    })
    res.status(200).send(obj);
})

module.exports = router;
