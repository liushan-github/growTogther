'use strict';

module.exports = app => {
  const { model } = app;
  const userSchema = require('../schema/user')(app);
  const User = model.define('user', userSchema);

  /**
   * 修改密码
   * @param {object} params - 条件
   * @return {string} - 用户uuid
   */
  User.updatePwd= async params => {
    const { id, userName, pwd,status,oldPwd} = params;
    const result = await User.update({ id,userName,pwd,status}, {
      where: {
        id,
        password: oldPwd,
      },
    });
    return id;
  };

  return User;
};

