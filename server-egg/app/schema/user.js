'use strict';

module.exports = app => {
  const { STRING,  UUIDV1, ENUM,INTEGER} = app.Sequelize;

  return {
    id: {
      type: INTEGER(38),
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV1,
    },
    // 0: '管理员', 1: '用户',2:'游客'
    status: {
      type: ENUM('0', '1','2'),
      allowNull: false,
    },
    userName: {
      type: STRING(12),
      allowNull: false,
      unique: true,
    },
    deptId:{
      type: INTEGER(38),
      allowNull:true,
    },
    deptName:{
      type: STRING(12),
      allowNull: true,
      unique: true,
    },
    pwd: {
      type: STRING(100),
      allowNull: false,
    },
    avatar: {
      type: STRING(255),
      allowNull: true,
    },
  };
};
