// 关联表之间的关系

const Class = require('./Class');
const Student = require('./Student');
// 学生和班级之间的关联关系，使用正向关联和反向关联
Class.hasMany(Student);
Student.belongsTo(Class);
