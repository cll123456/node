// 初始化路由层，搭建服务器
const express = require('express');
const routesCfg = require('../config/route/routesConfig.json')
const {defaultLogger} = require('./../config/logger');
const path = require('path');
// 创建一个服务
const app = express();
// 使用session中间件
// const session = require('express-session')
// app.use(session({secret: 'chenliangliang',name:'nodeMysql'}))

// 使用静态资源的中间件
app.use(express.static(path.resolve(__dirname, '../public')));

// 使用cors 跨域中间件
const cors = require('cors');
app.use(cors({
    "origin": ['null', 'http://localhost:63342'], // 维护运行的的源头
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", // 允许的请求方法名
    "preflightContinue": true, // 解析完后，给下一个中间件
    "optionsSuccessStatus": 200 // 响应的结果
}))

// 使用cookie解析cookie中间件，返回一个cookie对象
let cookieParser = require('cookie-parser');
app.use(cookieParser());

// 使用鉴权中间件
app.use(require('./../middleware/authorizationMiddleware'));

// 使用urlencode 中间件来获取post contentType= application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}))

// 使用json 中间件来获取post contentTpe =application/json
app.use(express.json())
// 使用学生的api的基路径
app.use('/api/student', require('./api/studentApi'));
app.use('/api/class', require('./api/classApi'));
app.use('/api/book', require('./api/bookApi'));
app.use('/api/administrator', require('./api/administratorsApi'));

// 在最后使用错误中间件进行数据的返回
app.use(require('./../middleware/errorMiddleware'));
// 启动一个服务
app.listen(routesCfg.servicePort, () => {
    defaultLogger.info('服务启动成功，监听端口3000')
})
