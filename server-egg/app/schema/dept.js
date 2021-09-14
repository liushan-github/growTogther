'use strict';

module.exports = app => {
  const { STRING,  UUIDV1, ENUM,INTEGER,DATE} = app.Sequelize;

  return {
    id: {
      type: INTEGER(38),
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV1,
    },
    deptName: {
      type: STRING(36),
      allowNull: false,
      unique: true,
    },
    step: {
      type: INTEGER(5),
      allowNull: false,
    },
    pid: {
      type: INTEGER(38),
      allowNull: true,
    },
    lastModifiedTime: {
      type: DATE,
      allowNull: false,
    },
    createdTime: {
      type: DATE,
      allowNull: false,
    },
    // version: {
    //   type: BIGINT,
    //   defaultValue: 0,
    // },
  };
};
