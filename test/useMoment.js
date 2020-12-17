const moment = require('moment');
// 修改语言包
moment.locale("zh-cn");
// 获取现在的时间 是一个moment时间对象
// console.log(moment())
// console.log(moment("12-25-1995", "MM-DD-YYYY"))

// console.log(moment("2010-10-20 4:30", "YYYY-MM-DD HH:mm"));;   // 解析为当地时间 4:30。
// console.log(moment("2010-10-20 4:30 +0000", "YYYY-MM-DD HH:mm Z"));; // 解析为 UTC 时间 4:30。


// console.log(moment("2010 13", "YYYY MM").isValid());     // false（不是真实的月份）
// console.log(moment("2010 11 31", "YYYY MM DD").isValid());  // false（不是真实的日期）
// console.log(moment("2010 2 29", "YYYY MM DD").isValid());  // false（不是闰年）
// console.log(moment("2010 notamonth 29", "YYYY MMM DD").isValid()); // false（不是真实的月份名称

console.log(moment().toString()); // Tue Dec 15 2020 10:27:54 GMT+0800
console.log(moment().utc().toString()); // Tue Dec 15 2020 02:27:54 GMT+0000

// 得到当前时间戳
console.log(moment().valueOf()); //1608001049455
console.log(+moment()); //1608001094344

// 得到utc的时间戳
console.log(moment().utc().valueOf()); // 1608001125789
console.log(+moment().utc()); // 1608001140360

// 根据指定的时间格式，得到时间
const value = '2020-12-14 11:00:00';
console.log(moment(value).format('yyyy-MM-DD')); //2020-12-15
// 获取时间戳 valueOf()
console.log(moment(value).valueOf(), +moment(value)); //1608001200000
console.log(moment(value).toString(), +moment(value)); //1608001200000

// 距离当前多久  fromNow()
console.log(moment(value).fromNow()); // 1天前
console.log(moment(value).toNow(true)); // 1天前

// 把utc时间转成当前时间 local
console.log(moment(value).utc().local().format('yyyy-MM-DD HH:mm:ss'));
console.log(moment(value).format('yyyy-MM-DD HH:mm:ss'));

const formats = ["YYYY-MM-DD HH:mm:ss", "YYYY-M-D H:m:s"];
console.log(moment.utc("1970-01-01 00:00:00", formats, true).local().format('YYYY-MM-DD HH:mm:ss'));
