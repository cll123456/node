// 初始化路由层，搭建服务器
const express = require('express');
const routesCfg = require('./../config/routesConfig.json')
const {defaultLogger} = require('./../config/logger');
const path = require('path');
// 创建一个服务
const app = express();
// 使用静态资源的中间件
app.use(express.static(path.resolve(__dirname, '../public')));
// 使用urlencode 中间件来获取post contentType= application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}))
// 使用json 中间件来获取post contentTpe =application/json
app.use(express.json())

// 在最后使用错误中间件进行数据的返回
app.use(require('./../middleware/errorMiddleware'));
// 启动一个服务
app.listen(routesCfg.servicePort, () => {
    defaultLogger.info('服务启动成功，监听端口3000')
})
