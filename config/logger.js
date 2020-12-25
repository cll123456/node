const log4js = require("log4js");
const path = require('path');
// appender的配置
function appenderOptions(path){
    return  {
        type: "dateFile", // 类型是输出一个文件
        filename: path.resolve(__dirname, "../logs", path, "logging.log"), // 文件的名称
        maxLogSize: 1024 * 1024, //配置 日志文件的最大字节数，然后自动换一个文件
        keepFileExt: true, // 保留后缀名
        daysToKeep: 30, // 旧日志保留多少天
        layout: {
            type: "pattern",
            pattern: "%c [%d{yyyy-MM-dd hh:mm:ss}] [%p]: %m%n", // 输出的日志格式
        }
    }
}

log4js.configure({
    // 日志分类
    categories:{
        sql: {
            appenders: ['sql'], // 分类出口，配置sql的日志
            level: 'all' // 日志级别
        },
        default: {
            appenders: ['default'],
            level: 'all' // 日志级别
        },
        api: {
            appenders: ['api'],
            level: 'all'
        }
    },
    // 出口
    appenders:{
        sql: appenderOptions('sql'),
        default: {
            type: "stdout" // 控制台输出
        },
        api: appenderOptions('api')
    }
})
// 这一行很重要，当服务退出的时候，需要把日志给记录完（记录日志是一个异步的过程）
process.on("exit", () => {
    log4js.shutdown();
});

// 导出日志记录
exports.sqlLogger = log4js.getLogger("sql");
exports.apiLogger = log4js.getLogger("api");
exports.defaultLogger = log4js.getLogger();
