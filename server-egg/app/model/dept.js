'use strict'
module.exports=(app)=>{
  const {model}=app;
  const deptSchema = require('../schema/dept.js')(app);
  const Dept = model.define('dept', deptSchema);
  Dept.get = async () => {
    return await Dept.findAll({
      raw: true,
      attributes: { exclude: ['lastModifiedTime','createdTime'] }
    });
  };
  return Dept;
};
